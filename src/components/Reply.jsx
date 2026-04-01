import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { likesAPI } from '../services/api';
import '../styles/feed.css';

const Reply = ({ reply, onReplyDeleted }) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(reply.likedByCurrentUser || false);
  const [likesCount, setLikesCount] = useState(reply.likesCount || 0);
  const [showLikes, setShowLikes] = useState(false);

  const handleLike = async () => {
    try {
      if (liked) {
        await likesAPI.unlikeReply(reply.id);
        setLiked(false);
        setLikesCount((count) => count - 1);
      } else {
        await likesAPI.likeReply(reply.id);
        setLiked(true);
        setLikesCount((count) => count + 1);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <div className="reply">
      <div className="reply-header">
        <strong>{reply.author.firstName} {reply.author.lastName}</strong>
        <span className="reply-time">{new Date(reply.createdAt).toLocaleDateString()}</span>
      </div>
      <p className="reply-content">{reply.content}</p>
      <div className="reply-actions">
        <button
          className={`like-btn ${liked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          👍 {likesCount}
        </button>
        {showLikes && reply.likes && reply.likes.length > 0 && (
          <div className="likes-list">
            {reply.likes.map((like) => (
              <span key={like.id} className="like-item">
                {like.user.firstName} {like.user.lastName}
              </span>
            ))}
          </div>
        )}
        {likesCount > 0 && (
          <button
            className="toggle-likes-btn"
            onClick={() => setShowLikes(!showLikes)}
          >
            {showLikes ? 'Hide' : 'View'} likes
          </button>
        )}
        {user?.id === reply.author.id && (
          <button className="delete-btn" onClick={() => onReplyDeleted(reply.id)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Reply;
