const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Helper to get auth headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Posts API
export const postsAPI = {
  // Get all posts (feed)
  getFeed: async (page = 1, limit = 10) => {
    const response = await fetch(
      `${API_BASE_URL}/api/posts?page=${page}&limit=${limit}`,
      { headers: getAuthHeaders() }
    );
    if (!response.ok) throw new Error('Failed to fetch feed');
    return response.json();
  },

  // Create a new post
  createPost: async (content, image, isPrivate = false) => {
    const formData = new FormData();
    formData.append('content', content);
    formData.append('isPrivate', isPrivate);
    if (image) {
      formData.append('image', image);
    }

    const response = await fetch(`${API_BASE_URL}/api/posts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
  },

  // Get a single post
  getPost: async (postId) => {
    const response = await fetch(`${API_BASE_URL}/api/posts/${postId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch post');
    return response.json();
  },

  // Delete a post
  deletePost: async (postId) => {
    const response = await fetch(`${API_BASE_URL}/api/posts/${postId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete post');
    return response.json();
  },
};

// Likes API
export const likesAPI = {
  // Like a post
  likePost: async (postId) => {
    const response = await fetch(`${API_BASE_URL}/api/posts/${postId}/like`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to like post');
    return response.json();
  },

  // Unlike a post
  unlikePost: async (postId) => {
    const response = await fetch(`${API_BASE_URL}/api/posts/${postId}/unlike`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to unlike post');
    return response.json();
  },

  // Get who liked a post
  getPostLikes: async (postId) => {
    const response = await fetch(`${API_BASE_URL}/api/posts/${postId}/likes`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch likes');
    return response.json();
  },

  // Like a comment
  likeComment: async (commentId) => {
    const response = await fetch(`${API_BASE_URL}/api/posts/comments/${commentId}/like`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to like comment');
    return response.json();
  },

  // Unlike a comment
  unlikeComment: async (commentId) => {
    const response = await fetch(`${API_BASE_URL}/api/posts/comments/${commentId}/unlike`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to unlike comment');
    return response.json();
  },

  // Like a reply
  likeReply: async (replyId) => {
    const response = await fetch(`${API_BASE_URL}/api/posts/replies/${replyId}/like`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to like reply');
    return response.json();
  },

  // Unlike a reply
  unlikeReply: async (replyId) => {
    const response = await fetch(`${API_BASE_URL}/api/posts/replies/${replyId}/unlike`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to unlike reply');
    return response.json();
  },
};

// Comments API
export const commentsAPI = {
  // Get comments for a post
  getComments: async (postId) => {
    const response = await fetch(`${API_BASE_URL}/api/posts/${postId}/comments`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch comments');
    return response.json();
  },

  // Create a comment
  createComment: async (postId, content) => {
    const response = await fetch(`${API_BASE_URL}/api/posts/${postId}/comments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ content }),
    });
    if (!response.ok) throw new Error('Failed to create comment');
    return response.json();
  },

  // Delete a comment
  deleteComment: async (commentId) => {
    const response = await fetch(`${API_BASE_URL}/api/posts/comments/${commentId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete comment');
    return response.json();
  },

  // Get who liked a comment
  getCommentLikes: async (commentId) => {
    const response = await fetch(`${API_BASE_URL}/api/posts/comments/${commentId}/likes`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch comment likes');
    return response.json();
  },
};

// Replies API
export const repliesAPI = {
  // Get replies for a comment
  getReplies: async (commentId) => {
    const response = await fetch(`${API_BASE_URL}/api/posts/comments/${commentId}/replies`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch replies');
    return response.json();
  },

  // Create a reply
  createReply: async (commentId, content) => {
    const response = await fetch(`${API_BASE_URL}/api/posts/comments/${commentId}/replies`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ content }),
    });
    if (!response.ok) throw new Error('Failed to create reply');
    return response.json();
  },

  // Delete a reply
  deleteReply: async (replyId) => {
    const response = await fetch(`${API_BASE_URL}/api/posts/replies/${replyId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete reply');
    return response.json();
  },

  // Get who liked a reply
  getReplyLikes: async (replyId) => {
    const response = await fetch(`${API_BASE_URL}/api/posts/replies/${replyId}/likes`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch reply likes');
    return response.json();
  },
};
