import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { likesAPI, commentsAPI } from '../services/api';
import Comment from './Comment';
import '../styles/feed.css';

const Post = ({ post, onPostDeleted }) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(post.likedByCurrentUser || false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [commentContent, setCommentContent] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [loadingComment, setLoadingComment] = useState(false);

  const handleLike = async () => {
    try {
      if (liked) {
        await likesAPI.unlikePost(post.id);
        setLiked(false);
        setLikesCount((count) => count - 1);
      } else {
        await likesAPI.likePost(post.id);
        setLiked(true);
        setLikesCount((count) => count + 1);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    setLoadingComment(true);
    try {
      const newComment = await commentsAPI.createComment(post.id, commentContent);
      setComments([...comments, newComment]);
      setCommentContent('');
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setLoadingComment(false);
    }
  };

  const handleCommentDeleted = (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  // Check if post is visible to current user
  const isVisible = !post.isPrivate || (user?.id === post.author.id);

  if (!isVisible) {
    return (
      <div className="post private-post">
        <p className="private-notice">This post is private</p>
      </div>
    );
  }

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-author">
          <strong>{post.author.firstName} {post.author.lastName}</strong>
          {post.isPrivate && <span className="private-badge">🔒 Private</span>}
        </div>
        <span className="post-time">{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
        {post.image && (
          <img src={post.image} alt="Post" className="post-image" />
        )}
      </div>

      <div className="post-actions">
        <button
          className={`like-btn ${liked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          👍 {likesCount}
        </button>
        {showLikes && post.likes && post.likes.length > 0 && (
          <div className="likes-list">
            {post.likes.map((like) => (
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
          className="comment-toggle-btn"
          onClick={() => setShowComments(!showComments)}
        >
          💬 {comments.length}
        </button>
        {user?.id === post.author.id && (
          <button className="delete-btn" onClick={() => onPostDeleted(post.id)}>
            Delete
          </button>
        )}
      </div>

      {showComments && (
        <div className="comments-section">
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Write a comment..."
              disabled={loadingComment}
            />
            <button type="submit" disabled={loadingComment}>
              {loadingComment ? 'Posting...' : 'Comment'}
            </button>
          </form>

          <div className="comments-list">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                postId={post.id}
                onCommentDeleted={handleCommentDeleted}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
