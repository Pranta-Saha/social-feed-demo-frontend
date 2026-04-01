import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { likesAPI, repliesAPI } from '../services/api';
import Reply from './Reply';
import '../styles/feed.css';

const Comment = ({ comment, onCommentDeleted }) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(comment.likedByCurrentUser || false);
  const [likesCount, setLikesCount] = useState(comment.likesCount || 0);
  const [replies, setReplies] = useState(comment.replies || []);
  const [replyContent, setReplyContent] = useState('');
  const [showReplies, setShowReplies] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [loadingReply, setLoadingReply] = useState(false);

  const handleLike = async () => {
    try {
      if (liked) {
        await likesAPI.unlikeComment(comment.id);
        setLiked(false);
        setLikesCount((count) => count - 1);
      } else {
        await likesAPI.likeComment(comment.id);
        setLiked(true);
        setLikesCount((count) => count + 1);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setLoadingReply(true);
    try {
      const newReply = await repliesAPI.createReply(comment.id, replyContent);
      setReplies([...replies, newReply]);
      setReplyContent('');
    } catch (error) {
      console.error('Error creating reply:', error);
    } finally {
      setLoadingReply(false);
    }
  };

  const handleReplyDeleted = (replyId) => {
    setReplies(replies.filter((reply) => reply.id !== replyId));
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <strong>{comment.author.firstName} {comment.author.lastName}</strong>
        <span className="comment-time">{new Date(comment.createdAt).toLocaleDateString()}</span>
      </div>
      <p className="comment-content">{comment.content}</p>

      <div className="comment-actions">
        <button
          className={`like-btn ${liked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          👍 {likesCount}
        </button>
        {showLikes && comment.likes && comment.likes.length > 0 && (
          <div className="likes-list">
            {comment.likes.map((like) => (
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
        <button
          className="reply-toggle-btn"
          onClick={() => setShowReplies(!showReplies)}
        >
          {showReplies ? 'Hide' : 'Show'} replies ({replies.length})
        </button>
        {user?.id === comment.author.id && (
          <button className="delete-btn" onClick={() => onCommentDeleted(comment.id)}>
            Delete
          </button>
        )}
      </div>

      {showReplies && (
        <div className="replies-section">
          <form onSubmit={handleReplySubmit} className="reply-form">
            <input
              type="text"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply..."
              disabled={loadingReply}
            />
            <button type="submit" disabled={loadingReply}>
              {loadingReply ? 'Posting...' : 'Reply'}
            </button>
          </form>

          <div className="replies-list">
            {replies.map((reply) => (
              <Reply
                key={reply.id}
                reply={reply}
                commentId={comment.id}
                onReplyDeleted={handleReplyDeleted}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
