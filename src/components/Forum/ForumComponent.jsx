import { useEffect, useState } from "react";
import {
  fetchPosts,
  toggleLikePost,
  toggleSavePost,
  createPost,
  addComment,
  fetchComments,
} from "../../services/forumApi";
import Sidebar from "./SideBar";
import PostList from "./PostList";
import PostDetail from "./PostDetail";
import NewPostModal from "./NewPostModal";
import "../../styles/forum.css";

const ForumComponent = () => {
  const [currentView, setCurrentView] = useState("forum");
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [sidebarView, setSidebarView] = useState("all");

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser?._id || currentUser?.id;

  /* ===== LOGIC ===== */
  useEffect(() => {
    fetchPosts().then((data) => {
      console.log("POSTS FROM API:", data);
      setPosts(data);
    });
  }, []);

  const handlePostClick = async (post) => {
    const comments = await fetchComments(post._id);

    setSelectedPost({
      ...post,
      commentsList: comments,
    });

    setCurrentView("detail");
  };

  const handleBack = () => {
    setCurrentView("forum");
    setSelectedPost(null);
    setNewComment("");
  };

  const toggleLike = async (postId) => {
    const res = await toggleLikePost(postId);

    setPosts((prev) =>
      prev.map((p) =>
        p._id === postId
          ? {
              ...p,
              likes: res.likes,
              likedByUser: res.likedByUser,
            }
          : p
      )
    );

    if (selectedPost?._id === postId) {
      setSelectedPost((prev) => ({
        ...prev,
        likes: res.likes,
        likedByUser: res.likedByUser,
      }));
    }
  };

  const toggleSave = async (postId) => {
    const res = await toggleSavePost(postId);

    setPosts((prev) =>
      prev.map((p) => (p._id === postId ? { ...p, saved: res.saved } : p))
    );

    if (selectedPost?._id === postId) {
      setSelectedPost((prev) => ({ ...prev, saved: res.saved }));
    }
  };

  const handleAddPost = async () => {
    if (!newPostContent.trim()) return;

    const newPost = await createPost(newPostContent);

    setPosts((prev) => [newPost, ...prev]);
    setNewPostContent("");
    setShowNewPostModal(false);
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !selectedPost) return;

    const comment = await addComment(selectedPost._id, newComment);

    setSelectedPost((prev) => ({
      ...prev,
      commentsList: [...prev.commentsList, comment],
    }));

    setNewComment("");
  };

  const displayedPosts =
    sidebarView === "saved"
      ? posts.filter((p) => p.saved)
      : sidebarView === "yourTalks"
      ? posts.filter(
          (p) =>
            p.author &&
            p.author._id &&
            p.author._id.toString() === currentUserId?.toString()
        )
      : posts;

  const savedCount = posts.filter((p) => p.saved).length;
  const userPostsCount = posts.filter(
    (p) =>
      p.author &&
      p.author._id &&
      p.author._id.toString() === currentUserId?.toString()
  ).length;

  return (
    <div className="container-fluid">
      <div className="row forum-main">
        <Sidebar
          sidebarView={sidebarView}
          setSidebarView={setSidebarView}
          savedCount={savedCount}
          userPostsCount={userPostsCount}
        />

        <main className="col-12 col-md-9 content">
          {currentView === "forum" && (
            <>
              <PostList
                posts={displayedPosts}
                onPostClick={handlePostClick}
                toggleLike={toggleLike}
                toggleSave={toggleSave}
                onAddPost={() => setShowNewPostModal(true)}
              />
            </>
          )}

          {currentView === "detail" && selectedPost && (
            <PostDetail
              post={selectedPost}
              onBack={() => setCurrentView("forum")}
              newComment={newComment}
              setNewComment={setNewComment}
              onAddComment={handleAddComment}
            />
          )}
        </main>

        <NewPostModal
          show={showNewPostModal}
          value={newPostContent}
          onChange={setNewPostContent}
          onClose={() => setShowNewPostModal(false)}
          onSubmit={handleAddPost}
        />
      </div>
    </div>
  );
};

export default ForumComponent;
