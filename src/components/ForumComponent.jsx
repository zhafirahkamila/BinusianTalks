import { useState } from 'react';
import { Heart, MessageSquare, Bookmark, Plus } from 'lucide-react';

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
    commentsList: [],
    isUserPost: false
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
    commentsList: [],
    isUserPost: false
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
    commentsList: [],
    isUserPost: false
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
    commentsList: [],
    isUserPost: false
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
    commentsList: [],
    isUserPost: false
  }
];

const ForumComponent = () => {
  const [currentView, setCurrentView] = useState('forum');
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState(initialPosts);
  const [newComment, setNewComment] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [sidebarView, setSidebarView] = useState('all');

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setCurrentView('detail');
  };

  const handleBack = () => {
    setCurrentView('forum');
    setSelectedPost(null);
    setNewComment('');
  };

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

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prev => ({
        ...prev,
        likes: prev.likedByUser ? prev.likes - 1 : prev.likes + 1,
        likedByUser: !prev.likedByUser
      }));
    }
  };

  const toggleSave = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, saved: !post.saved }
        : post
    ));

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prev => ({
        ...prev,
        saved: !prev.saved
      }));
    }
  };

  const handleAddPost = () => {
    if (!newPostContent.trim()) return;

    const newPost = {
      id: posts.length + 1,
      author: "Current User",
      avatar: "/avatars/default.jpg",
      content: newPostContent,
      likes: 0,
      comments: 0,
      saved: false,
      likedByUser: false,
      commentsList: [],
      isUserPost: true
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setShowNewPostModal(false);
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedPost) return;

    const comment = {
      id: Date.now(),
      author: "Current User",
      avatar: "/avatars/default.jpg",
      content: newComment,
      likes: 0,
      timestamp: "Just now"
    };

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

    setSelectedPost(prev => ({
      ...prev,
      comments: prev.comments + 1,
      commentsList: [...(prev.commentsList || []), comment]
    }));

    setNewComment('');
  };

  const getDisplayedPosts = () => {
    if (sidebarView === 'saved') {
      return posts.filter(post => post.saved);
    } else if (sidebarView === 'yourTalks') {
      return posts.filter(post => post.isUserPost);
    }
    return posts;
  };

  const savedCount = posts.filter(p => p.saved).length;
  const userPostsCount = posts.filter(p => p.isUserPost).length;

  // Inline Styles
  const styles = {
    forumMain: {
      display: 'flex',
      maxWidth: '1400px',
      margin: '0 auto',
      backgroundColor: '#dbeafe',
      minHeight: '100vh'
    },
    sidebar: {
      width: '260px',
      backgroundColor: '#dbeafe',
      padding: '32px 20px',
      marginLeft: '-20px'
    },
    sidebarItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: '#1f2937',
      fontWeight: '600',
      padding: '14px 16px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      borderRadius: '8px',
      marginBottom: '4px'
    },
    sidebarItemActive: {
      backgroundColor: 'rgba(59, 130, 246, 0.15)',
      color: '#2563eb'
    },
    content: {
      flex: 1,
      padding: '32px 48px',
      backgroundColor: '#dbeafe'
    },
    addTalkButton: {
      background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
      borderRadius: '12px',
      padding: '20px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      marginBottom: '24px',
      transition: 'all 0.3s',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
    },
    addTalkText: {
      color: 'white',
      fontSize: '18px',
      fontWeight: '500'
    },
    addTalkIcon: {
      backgroundColor: '#fbbf24',
      borderRadius: '50%',
      padding: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    postsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    postCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      padding: '24px',
      cursor: 'pointer',
      transition: 'box-shadow 0.3s'
    },
    postCardDetail: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      padding: '24px',
      cursor: 'default',
      marginBottom: '24px'
    },
    postHeader: {
      display: 'flex',
      gap: '16px'
    },
    avatar: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      objectFit: 'cover'
    },
    postMain: {
      flex: 1
    },
    postAuthor: {
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '8px',
      fontSize: '16px'
    },
    postContent: {
      color: '#374151',
      marginBottom: '16px',
      lineHeight: '1.5'
    },
    postActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      color: '#6b7280'
    },
    actionButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#6b7280',
      transition: 'color 0.2s',
      padding: 0,
      fontSize: '14px'
    },
    actionButtonLiked: {
      color: '#ef4444'
    },
    actionInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px'
    },
    bookmarkButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#9ca3af',
      transition: 'color 0.2s',
      padding: 0
    },
    bookmarkButtonSaved: {
      color: '#fbbf24'
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'none',
      border: 'none',
      color: '#2563eb',
      fontWeight: '500',
      cursor: 'pointer',
      marginBottom: '16px',
      padding: 0,
      fontSize: '16px'
    },
    addResponse: {
      background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
      borderRadius: '12px',
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '24px',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
    },
    responseInput: {
      flex: 1,
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: 'white',
      fontSize: '16px'
    },
    responseButton: {
      backgroundColor: '#fbbf24',
      color: 'white',
      fontWeight: '600',
      padding: '8px 24px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    commentsSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    commentsTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '16px'
    },
    commentCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      padding: '24px'
    },
    commentAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      objectFit: 'cover'
    },
    commentTop: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '4px'
    },
    commentAuthor: {
      fontWeight: 'bold',
      color: '#111827',
      fontSize: '14px'
    },
    commentTime: {
      fontSize: '14px',
      color: '#6b7280'
    },
    commentContent: {
      color: '#374151',
      marginBottom: '12px',
      lineHeight: '1.5'
    },
    commentLike: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#6b7280',
      transition: 'color 0.2s',
      padding: 0,
      fontSize: '14px'
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)'
    },
    modalContent: {
      background: 'white',
      borderRadius: '16px',
      padding: '32px',
      width: '90%',
      maxWidth: '600px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    },
    modalTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '20px'
    },
    modalTextarea: {
      width: '100%',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      padding: '16px',
      fontSize: '16px',
      color: '#111827',
      resize: 'vertical',
      outline: 'none',
      transition: 'border-color 0.2s',
      fontFamily: 'inherit'
    },
    modalActions: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
      marginTop: '24px'
    },
    modalCancel: {
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
      border: 'none',
      fontSize: '16px',
      backgroundColor: '#f3f4f6',
      color: '#374151'
    },
    modalSubmit: {
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
      border: 'none',
      fontSize: '16px',
      background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
      color: 'white'
    },
    emptyState: {
      textAlign: 'center',
      padding: '48px 24px',
      color: '#6b7280',
      fontSize: '16px'
    },
    noComments: {
      textAlign: 'center',
      color: '#6b7280',
      padding: '24px',
      fontSize: '15px'
    }
  };

  return (
    <div style={styles.forumMain}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div 
          style={{
            ...styles.sidebarItem,
            ...(sidebarView === 'all' ? styles.sidebarItemActive : {})
          }}
          onClick={() => setSidebarView('all')}
        >
          <MessageSquare size={24} />
          <span>All Talks</span>
        </div>
        <div 
          style={{
            ...styles.sidebarItem,
            ...(sidebarView === 'saved' ? styles.sidebarItemActive : {})
          }}
          onClick={() => setSidebarView('saved')}
        >
          <Bookmark size={24} />
          <span>Saved {savedCount > 0 && `(${savedCount})`}</span>
        </div>
        <div 
          style={{
            ...styles.sidebarItem,
            ...(sidebarView === 'yourTalks' ? styles.sidebarItemActive : {})
          }}
          onClick={() => setSidebarView('yourTalks')}
        >
          <MessageSquare size={24} />
          <span>Your Talks {userPostsCount > 0 && `(${userPostsCount})`}</span>
        </div>
      </aside>

      {/* Forum List View */}
      {currentView === 'forum' && (
        <main style={styles.content}>
          {/* Add New Talk Button */}
          <div 
            style={styles.addTalkButton}
            onClick={() => setShowNewPostModal(true)}
          >
            <span style={styles.addTalkText}>Add a new talk....</span>
            <div style={styles.addTalkIcon}>
              <Plus size={24} color="white" />
            </div>
          </div>

          {/* New Post Modal */}
          {showNewPostModal && (
            <div style={styles.modalOverlay} onClick={() => setShowNewPostModal(false)}>
              <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h3 style={styles.modalTitle}>Create New Talk</h3>
                <textarea
                  style={styles.modalTextarea}
                  placeholder="What's on your mind?"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  rows={5}
                />
                <div style={styles.modalActions}>
                  <button 
                    style={styles.modalCancel}
                    onClick={() => {
                      setShowNewPostModal(false);
                      setNewPostContent('');
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    style={styles.modalSubmit}
                    onClick={handleAddPost}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Forum Posts */}
          <div style={styles.postsContainer}>
            {getDisplayedPosts().length === 0 ? (
              <div style={styles.emptyState}>
                <p>No posts to show</p>
              </div>
            ) : (
              getDisplayedPosts().map(post => (
                <div 
                  key={post.id}
                  style={styles.postCard}
                  onClick={() => handlePostClick(post)}
                >
                  <div style={styles.postHeader}>
                    <img 
                      src={post.avatar} 
                      alt={post.author}
                      style={styles.avatar}
                    />
                    <div style={styles.postMain}>
                      <h3 style={styles.postAuthor}>{post.author}</h3>
                      <p style={styles.postContent}>{post.content}</p>
                      <div style={styles.postActions}>
                        <button 
                          style={{
                            ...styles.actionButton,
                            ...(post.likedByUser ? styles.actionButtonLiked : {})
                          }}
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
                        <div style={styles.actionInfo}>
                          <MessageSquare size={20} />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      style={{
                        ...styles.bookmarkButton,
                        ...(post.saved ? styles.bookmarkButtonSaved : {})
                      }}
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
        <main style={styles.content}>
          {/* Back button */}
          <button onClick={handleBack} style={styles.backButton}>
            <span>←</span>
            <span>Back to Forum</span>
          </button>

          {/* Original Post */}
          <div style={styles.postCardDetail}>
            <div style={styles.postHeader}>
              <img 
                src={selectedPost.avatar} 
                alt={selectedPost.author}
                style={styles.avatar}
              />
              <div style={styles.postMain}>
                <h3 style={styles.postAuthor}>{selectedPost.author}</h3>
                <p style={styles.postContent}>{selectedPost.content}</p>
                <div style={styles.postActions}>
                  <button 
                    style={{
                      ...styles.actionButton,
                      ...(selectedPost.likedByUser ? styles.actionButtonLiked : {})
                    }}
                    onClick={() => toggleLike(selectedPost.id)}
                  >
                    <Heart 
                      size={20} 
                      fill={selectedPost.likedByUser ? 'currentColor' : 'none'}
                    />
                    <span>{selectedPost.likes}</span>
                  </button>
                  <div style={styles.actionInfo}>
                    <MessageSquare size={20} />
                    <span>{selectedPost.comments}</span>
                  </div>
                </div>
              </div>
              <button 
                style={{
                  ...styles.bookmarkButton,
                  ...(selectedPost.saved ? styles.bookmarkButtonSaved : {})
                }}
                onClick={() => toggleSave(selectedPost.id)}
              >
                <Bookmark size={24} fill={selectedPost.saved ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* Add Response */}
          <div style={styles.addResponse}>
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
              style={styles.responseInput}
            />
            <button 
              style={styles.responseButton}
              onClick={handleAddComment}
            >
              Add
            </button>
          </div>

          {/* Comments Section */}
          <div style={styles.commentsSection}>
            <h3 style={styles.commentsTitle}>
              Responses ({selectedPost.commentsList?.length || 0})
            </h3>
            {selectedPost.commentsList && selectedPost.commentsList.length > 0 ? (
              selectedPost.commentsList.map(comment => (
                <div key={comment.id} style={styles.commentCard}>
                  <div style={styles.postHeader}>
                    <img 
                      src={comment.avatar} 
                      alt={comment.author}
                      style={styles.commentAvatar}
                    />
                    <div style={styles.postMain}>
                      <div style={styles.commentTop}>
                        <h4 style={styles.commentAuthor}>{comment.author}</h4>
                        <span style={styles.commentTime}>{comment.timestamp}</span>
                      </div>
                      <p style={styles.commentContent}>{comment.content}</p>
                      <button style={styles.commentLike}>
                        <Heart size={16} />
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={styles.noComments}>No responses yet. Be the first to respond!</p>
            )}
          </div>
        </main>
      )}
    </div>
  );
};

export default ForumComponent;