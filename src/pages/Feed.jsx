import { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import { postsAPI } from '../services/api';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost';
import '../styles/feed.css';

const Feed = () => {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async (pageNum = 1) => {
    setLoading(true);
    setError('');
    try {
      const data = await postsAPI.getFeed(pageNum, 10);
      if (pageNum === 1) {
        setPosts(data.posts || []);
      } else {
        setPosts((prev) => [...prev, ...(data.posts || [])]);
      }
      setHasMore(data.hasMore || false);
      setPage(pageNum);
    } catch (err) {
      setError(err.message || 'Failed to load feed');
      console.error('Error loading feed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostDeleted = async (postId) => {
    try {
      await postsAPI.deletePost(postId);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  const handleLoadMore = () => {
    loadFeed(page + 1);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="feed-container">
      <header className="feed-header">
        <div className="header-content">
          <h1>Social Feed</h1>
          <div className="user-info">
            <span>Welcome, {user?.firstName}!</span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="feed-content">
        <CreatePost onPostCreated={handlePostCreated} />

        {error && <div className="error-message">{error}</div>}

        {loading && <div className="loading">Loading feed...</div>}

        <div className="posts-list">
          {posts.length === 0 && !loading && (
            <div className="no-posts">No posts yet. Be the first to post!</div>
          )}

          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onPostDeleted={handlePostDeleted}
            />
          ))}
        </div>

        {hasMore && !loading && (
          <button onClick={handleLoadMore} className="btn-load-more">
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Feed;
