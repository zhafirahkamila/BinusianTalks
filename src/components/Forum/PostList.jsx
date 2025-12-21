import { Plus } from "lucide-react";
import PostCard from "./PostCard";

const PostList = ({ posts, onPostClick, toggleLike, toggleSave, onAddPost }) => {
  return (
    <>
      <div className="add-talk-button" onClick={onAddPost}>
        <span className="add-talk-text">Add a new talk....</span>
        <div className="add-talk-icon">
          <Plus size={24} color="white" />
        </div>
      </div>

      <div className="posts-container">
        {posts.length === 0 ? (
          <div className="empty-state">No posts to show</div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onClick={onPostClick}
              toggleLike={toggleLike}
              toggleSave={toggleSave}
            />
          ))
        )}
      </div>
    </>
  );
};

export default PostList;