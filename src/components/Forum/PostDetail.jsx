import { fromNow, formatDateTime } from "../utils/date";

const PostDetail = ({ post, onBack, newComment, setNewComment, onAddComment }) => {
  return (
    <>
      <button className="back-button" onClick={onBack}>
        ← Back to Forum
      </button>

      <div className="post-card-detail">
        <div className="post-header">
          <img src={post.author.profileImage} alt={post.author.username} className="avatar" />
          <div className="post-main">
            <h3 className="post-author">{post.author.username}</h3>
            <p className="post-content">{post.content}</p>
          </div>
        </div>
      </div>

      <div className="add-response">
        <input
          className="response-input"
          placeholder="Add a response..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onAddComment()}
        />
        <button className="response-button" onClick={onAddComment}>
          Add
        </button>
      </div>

      <div className="comments-section">
        <h3 className="comments-title">
          Responses ({post.commentsList.length})
        </h3>

        {post.commentsList.length === 0 ? (
          <p className="no-comments">
            No responses yet. Be the first to respond!
          </p>
        ) : (
          post.commentsList.map((comment) => (
            <div key={comment._id} className="comment-card">
              <div className="post-header">
                <img
                  src={
                    comment.avatar
                      ? `${import.meta.env.VITE_API_URL}${comment.avatar}`
                      : "/assets/images/gwen.jpg"
                  }
                  alt={comment.author}
                  className="comment-avatar"
                />

                <div className="post-main">
                  <div className="comment-top">
                    <strong className="comment-author">
                      {comment.author}
                    </strong>
                    <span
                      className="comment-time"
                      title={formatDateTime(comment.timestamp)}
                    >
                      {fromNow(comment.timestamp)}
                    </span>

                  </div>
                  <p className="comment-content">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default PostDetail;