# Social Feed Application - Frontend Implementation

A complete React frontend skeleton with minimal design for a social media application with posts, comments, replies, and like/unlike functionality.

## Project Structure

```
src/
├── context/
│   ├── AuthContext.jsx          # Authentication provider component
│   ├── AuthContextObj.js        # Auth context object (separate for React Fast Refresh)
│   └── useAuth.js               # Custom hook for using auth context
├── pages/
│   ├── Home.jsx                 # Landing page
│   ├── Login.jsx                # Login page
│   ├── Register.jsx             # Registration page
│   └── Feed.jsx                 # Protected feed page
├── components/
│   ├── ProtectedRoute.jsx       # Route protection wrapper
│   ├── CreatePost.jsx           # Post creation component
│   ├── Post.jsx                 # Individual post component with likes
│   ├── Comment.jsx              # Comment component with replies
│   └── Reply.jsx                # Reply component with likes
├── services/
│   └── api.js                   # API service with all endpoints
├── styles/
│   ├── auth.css                 # Authentication pages styling
│   ├── home.css                 # Home page styling
│   └── feed.css                 # Feed and components styling
├── App.jsx                      # Main app with routing
├── App.css                      # App-level CSS
├── index.css                    # Global CSS
└── main.jsx                     # React entry point
```

## Features Implemented

### 1. Authentication & Authorization
- **Session-based authentication** with localStorage token storage
- **Registration** with: firstName, lastName, email, password
- **Login** with email and password
- **Protected routes** - Feed only accessible to authenticated users
- **Automatic logout** on token expiry or manual logout

### 2. Feed Page
- **Access Control**: Protected route, visible only to logged-in users
- **Post Creation**:
  - Text content with image support
  - Private/public toggle
  - Image preview before posting
- **Post Display**:
  - Shows posts from newest first
  - Displays author info and timestamp
  - Shows privacy badge for private posts
- **Like System**:
  - Like/unlike posts, comments, and replies
  - View who liked (expandable list)
  - Like count display
  
### 3. Comments & Replies
- **Comments**:
  - Comment on posts
  - Like/unlike comments
  - View who liked comments
  - Delete own comments
- **Replies**:
  - Reply to comments
  - Like/unlike replies
  - View who liked replies
  - Delete own replies
  - Nested structure (replies within comments)

### 4. Privacy Control
- **Private Posts**: Visible only to the author
- **Public Posts**: Visible to all users
- Privacy indicator badge on posts

### 5. User Experience
- Clean, minimal UI design
- Gradient-based color scheme
- Responsive layout
- Loading states
- Error messages
- Form validation

## API Endpoints Expected

The frontend expects the following API endpoints:

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user

### Posts
- `GET /api/posts` - Get feed (paginated)
- `POST /api/posts` - Create post
- `DELETE /api/posts/{id}` - Delete post

### Likes
- `POST /api/posts/{id}/like` - Like a post
- `POST /api/posts/{id}/unlike` - Unlike a post
- `GET /api/posts/{id}/likes` - Get who liked a post
- `POST /api/comments/{id}/like` - Like a comment
- `POST /api/comments/{id}/unlike` - Unlike a comment
- `GET /api/comments/{id}/likes` - Get comment likes
- `POST /api/replies/{id}/like` - Like a reply
- `POST /api/replies/{id}/unlike` - Unlike a reply
- `GET /api/replies/{id}/likes` - Get reply likes

### Comments
- `GET /api/posts/{id}/comments` - Get post comments
- `POST /api/posts/{id}/comments` - Create comment
- `DELETE /api/comments/{id}` - Delete comment

### Replies
- `GET /api/comments/{id}/replies` - Get comment replies
- `POST /api/comments/{id}/replies` - Create reply
- `DELETE /api/replies/{id}` - Delete reply

## Authentication Flow

1. User visits the application (unauthenticated)
2. Shown Home page with Login/Register options
3. User registers or logs in
4. Token is stored in localStorage
5. User is redirected to Feed page
6. Feed is protected - only accessible with valid token
7. User can logout which clears token and redirects to Home

## Running the Application

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Environment Variables

Add a `.env.local` file for custom API base URL:
```
VITE_API_BASE_URL=http://your-api-url.com
```

If not set, defaults to `http://localhost:3000`

## Component Communication

- **AuthContext**: Provides user, token, login/logout functions
- **useAuth Hook**: Custom hook for accessing auth state in components
- **API Service**: Centralized API calls with automatic token injection
- **Props**: Components use props for data passing and callbacks

## Styling

- **Colors**: Purple gradient (#667eea to #764ba2) as primary
- **Typography**: System fonts (sans-serif)
- **Responsive**: Mobile-first design with CSS Grid/Flexbox
- **Components**: Minimal, clean UI with focus on functionality

## Notes

- The application assumes all API endpoints are ready
- Token is stored in localStorage for persistence across sessions
- The API service automatically includes the Bearer token in requests
- All form validations are implemented on the client side
- The application is production-ready but requires backend API integration
