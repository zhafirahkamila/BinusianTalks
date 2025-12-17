import React, { useState } from 'react';
import { Heart, MessageSquare, Bookmark, Plus, Bell } from 'lucide-react';
import '../styles/Forum.css';
import Footer from '../components/Footer';

// Initial dummy data
const initialPosts = [
  {
    id: 1,
    author: "Halley Cantik",
    avatar: "/avatars/halley.jpg",
    content: "Passionate about technology and innovation. Love to code, learn new things, and connect with fellow students!",
    likes: 10,
    comments: 4,
    saved: false,
    likedByUser: false,
    commentsList: []
  },
  {
    id: 2,
    author: "Nia Pendek",
    avatar: "/avatars/nia.jpg",
    content: "Just finished my first React project! It's amazing how much you can build with modern web technologies. Anyone want to collaborate?",
    likes: 25,
    comments: 8,
    saved: false,
    likedByUser: false,
    commentsList: []
  },
  {
    id: 3,
    author: "Kamila Cupu",
    avatar: "/avatars/kamila.jpg",
    content: "Looking for study partners for the upcoming algorithms exam. Let's form a study group!",
    likes: 15,
    comments: 12,
    saved: true,
    likedByUser: false,
    commentsList: []
  },
  {
    id: 4,
    author: "Kinan Gendut",
    avatar: "/avatars/kinan.jpg",
    content: "Has anyone tried the new AI coding assistant? It's a game changer for debugging complex issues!",
    likes: 42,
    comments: 18,
    saved: false,
    likedByUser: false,
    commentsList: []
  },
  {
    id: 5,
    author: "I love Jesus",
    avatar: "/avatars/jesus.jpg",
    content: "Excited to announce that I just got accepted into the software engineering internship program! Dreams do come true with hard work! 🎉",
    likes: 89,
    comments: 24,
    saved: false,
    likedByUser: false,
    commentsList: []
  }
];

function Forum() {
  const [currentView, setCurrentView] = useState('forum');
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState(initialPosts);
  const [newComment, setNewComment] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [sidebarView, setSidebarView] = useState('all'); // 'all', 'saved', 'notifications'

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setCurrentView('detail');
  };

  const handleBack = () => {
    setCurrentView('forum');
    setSelectedPost(null);
    setNewComment('');
  };

  // Toggle like dengan logika bisa unlike
  const toggleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.likedByUser ? post.likes - 1 : post.likes + 1,
          likedByUser: !post.likedByUser
        };
      }
      return post;
    }));

    // Update selected post juga kalau ada
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prev => ({
        ...prev,
        likes: prev.likedByUser ? prev.likes - 1 : prev.likes + 1,
        likedByUser: !prev.likedByUser
      }));
    }
  };

  // Toggle save
  const toggleSave = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, saved: !post.saved }
        : post
    ));

    // Update selected post juga kalau ada
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prev => ({
        ...prev,
        saved: !prev.saved
      }));
    }
  };

  // Add new post
  const handleAddPost = () => {
    if (!newPostContent.trim()) return;

    const newPost = {
      id: posts.length + 1,
      author: "Current User", // Nanti bisa diganti dengan user yang login
      avatar: "/avatars/default.jpg",
      content: newPostContent,
      likes: 0,
      comments: 0,
      saved: false,
      likedByUser: false,
      commentsList: []
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setShowNewPostModal(false);
  };

  // Add comment
  const handleAddComment = () => {
    if (!newComment.trim() || !selectedPost) return;

    const comment = {
      id: Date.now(),
      author: "Current User", // Nanti bisa diganti dengan user yang login
      avatar: "/avatars/default.jpg",
      content: newComment,
      likes: 0,
      timestamp: "Just now"
    };

    // Update posts
    setPosts(posts.map(post => {
      if (post.id === selectedPost.id) {
        return {
          ...post,
          comments: post.comments + 1,
          commentsList: [...(post.commentsList || []), comment]
        };
      }
      return post;
    }));

    // Update selected post
    setSelectedPost(prev => ({
      ...prev,
      comments: prev.comments + 1,
      commentsList: [...(prev.commentsList || []), comment]
    }));

    setNewComment('');
  };

  // Filter posts berdasarkan sidebar view
  const getDisplayedPosts = () => {
    if (sidebarView === 'saved') {
      return posts.filter(post => post.saved);
    }
    return posts;
  };

  const savedCount = posts.filter(p => p.saved).length;

  return (
    <>
      {/* Main Content */}
      <div className="forum-main">
        {/* Sidebar */}
        <aside className="forum-sidebar">
          <div 
            className={`sidebar-item ${sidebarView === 'all' ? 'active' : ''}`}
            onClick={() => setSidebarView('all')}
          >
            <Bell size={24} />
            <span className="sidebar-text">Notification</span>
          </div>
          <div 
            className={`sidebar-item ${sidebarView === 'saved' ? 'active' : ''}`}
            onClick={() => setSidebarView('saved')}
          >
            <Bookmark size={24} />
            <span className="sidebar-text">Saved {savedCount > 0 && `(${savedCount})`}</span>
          </div>
          <div className="sidebar-item">
            <MessageSquare size={24} />
            <span className="sidebar-text">Your Talks</span>
          </div>
        </aside>

        {/* Forum List View */}
        {currentView === 'forum' && (
          <main className="forum-content">
            {/* Add New Talk Button */}
            <div 
              className="add-talk-button"
              onClick={() => setShowNewPostModal(true)}
            >
              <span className="add-talk-text">Add a new talk....</span>
              <div className="add-talk-icon">
                <Plus size={24} color="white" />
              </div>
            </div>

            {/* New Post Modal */}
            {showNewPostModal && (
              <div className="modal-overlay" onClick={() => setShowNewPostModal(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <h3 className="modal-title">Create New Talk</h3>
                  <textarea
                    className="modal-textarea"
                    placeholder="What's on your mind?"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    rows={5}
                  />
                  <div className="modal-actions">
                    <button 
                      className="modal-cancel"
                      onClick={() => {
                        setShowNewPostModal(false);
                        setNewPostContent('');
                      }}
                    >
                      Cancel
                    </button>
                    <button 
                      className="modal-submit"
                      onClick={handleAddPost}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Forum Posts */}
            <div className="posts-container">
              {getDisplayedPosts().length === 0 ? (
                <div className="empty-state">
                  <p>No posts to show</p>
                </div>
              ) : (
                getDisplayedPosts().map(post => (
                  <div 
                    key={post.id}
                    className="post-card"
                    onClick={() => handlePostClick(post)}
                  >
                    <div className="post-header">
                      <img 
                        src={post.avatar} 
                        alt={post.author}
                        className="post-avatar"
                      />
                      <div className="post-main">
                        <h3 className="post-author">{post.author}</h3>
                        <p className="post-content">{post.content}</p>
                        <div className="post-actions">
                          <button 
                            className={`action-button ${post.likedByUser ? 'liked' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLike(post.id);
                            }}
                          >
                            <Heart 
                              size={20} 
                              fill={post.likedByUser ? 'currentColor' : 'none'}
                            />
                            <span>{post.likes}</span>
                          </button>
                          <div className="action-info">
                            <MessageSquare size={20} />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                      </div>
                      <button 
                        className={`bookmark-button ${post.saved ? 'saved' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSave(post.id);
                        }}
                      >
                        <Bookmark size={24} fill={post.saved ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
        )}

        {/* Forum Detail View */}
        {currentView === 'detail' && selectedPost && (
          <main className="forum-content">
            {/* Back button */}
            <button onClick={handleBack} className="back-button">
              <span>←</span>
              <span>Back to Forum</span>
            </button>

            {/* Original Post */}
            <div className="post-card detail-post">
              <div className="post-header">
                <img 
                  src={selectedPost.avatar} 
                  alt={selectedPost.author}
                  className="post-avatar"
                />
                <div className="post-main">
                  <h3 className="post-author">{selectedPost.author}</h3>
                  <p className="post-content">{selectedPost.content}</p>
                  <div className="post-actions">
                    <button 
                      className={`action-button ${selectedPost.likedByUser ? 'liked' : ''}`}
                      onClick={() => toggleLike(selectedPost.id)}
                    >
                      <Heart 
                        size={20} 
                        fill={selectedPost.likedByUser ? 'currentColor' : 'none'}
                      />
                      <span>{selectedPost.likes}</span>
                    </button>
                    <div className="action-info">
                      <MessageSquare size={20} />
                      <span>{selectedPost.comments}</span>
                    </div>
                  </div>
                </div>
                <button 
                  className={`bookmark-button ${selectedPost.saved ? 'saved' : ''}`}
                  onClick={() => toggleSave(selectedPost.id)}
                >
                  <Bookmark size={24} fill={selectedPost.saved ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            {/* Add Response */}
            <div className="add-response">
              <input 
                type="text"
                placeholder="Add a response..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddComment();
                  }
                }}
                className="response-input"
              />
              <button 
                className="response-button"
                onClick={handleAddComment}
              >
                Add
              </button>
            </div>

            {/* Comments Section */}
            <div className="comments-section">
              <h3 className="comments-title">
                Responses ({selectedPost.commentsList?.length || 0})
              </h3>
              {selectedPost.commentsList && selectedPost.commentsList.length > 0 ? (
                selectedPost.commentsList.map(comment => (
                  <div key={comment.id} className="comment-card">
                    <div className="comment-header">
                      <img 
                        src={comment.avatar} 
                        alt={comment.author}
                        className="comment-avatar"
                      />
                      <div className="comment-main">
                        <div className="comment-top">
                          <h4 className="comment-author">{comment.author}</h4>
                          <span className="comment-time">{comment.timestamp}</span>
                        </div>
                        <p className="comment-content">{comment.content}</p>
                        <button className="comment-like">
                          <Heart size={16} />
                          <span>{comment.likes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-comments">No responses yet. Be the first to respond!</p>
              )}
            </div>
          </main>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Forum;