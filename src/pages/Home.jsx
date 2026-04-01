import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Social Feed</h1>
        <p className="tagline">Connect, Share, and Engage with Others</p>

        <div className="home-buttons">
          <Link to="/login" className="btn-primary">
            Login
          </Link>
          <Link to="/register" className="btn-secondary">
            Create Account
          </Link>
        </div>

        <div className="features">
          <div className="feature">
            <span className="feature-icon">📝</span>
            <h3>Share Posts</h3>
            <p>Create public or private posts with images</p>
          </div>
          <div className="feature">
            <span className="feature-icon">💬</span>
            <h3>Comment & Reply</h3>
            <p>Engage with others through comments and replies</p>
          </div>
          <div className="feature">
            <span className="feature-icon">👍</span>
            <h3>Like & Engage</h3>
            <p>Show your appreciation with likes and see who liked your content</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
