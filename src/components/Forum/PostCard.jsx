import { Heart, MessageSquare, Bookmark } from "lucide-react";
import { fromNow, formatDateTime } from "../../utils/date";

const PostCard = ({ post, onClick, toggleLike, toggleSave }) => {
  return (
    <div className="post-card" onClick={() => onClick(post)}>
      <div className="post-header">
        {/* AVATAR */}
        <img
          src={
            post.author.profileImage
              ? `https://binusiantalks-api-production.up.railway.app${post.author.profileImage}`
              : "/assets/images/gwen.jpg"
          }
          alt={post.author.username}
          className="avatar"
        />

        {/* MAIN CONTENT */}
        <div className="post-main">
          <h3 className="post-author">{post.author.username}</h3>
          <p className="post-content">{post.content}</p>

          <div className="post-actions">
            <button
              className={`action-button ${post.likedByUser ? "liked" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(post._id);
              }}
            >
              <Heart
                size={18}
                fill={post.likedByUser ? "currentColor" : "none"}
              />
              {post.likes}
            </button>

            <div className="action-info">
              <MessageSquare size={18} />
              {post.comments}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (TIME + SAVE) */}
        <div className="post-right">
          <span
            className="post-time"
            title={formatDateTime(post.createdAt)}
          >
            {fromNow(post.createdAt)}
          </span>

          <button
            className={`bookmark-button ${post.saved ? "saved" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleSave(post._id);
            }}
          >
            <Bookmark
              size={22}
              fill={post.saved ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;