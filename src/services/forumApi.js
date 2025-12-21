const API_URL = "http://localhost:5050/api/forum";

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json"
});

export const fetchPosts = async () => {
  const res = await fetch(`${API_URL}/posts`, {
    headers: getAuthHeader()
  });
  return res.json();
};

export const createPost = async (content) => {
  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify({ content })
  });
  return res.json();
};

export const toggleLikePost = async (postId) => {
  const res = await fetch(`${API_URL}/posts/${postId}/like`, {
    method: "POST",
    headers: getAuthHeader()
  });
  return res.json();
};

export const toggleSavePost = async (postId) => {
  const res = await fetch(`${API_URL}/posts/${postId}/save`, {
    method: "POST",
    headers: getAuthHeader()
  });
  return res.json();
};

export const fetchComments = async (postId) => {
  const res = await fetch(`${API_URL}/posts/${postId}/comments`, {
    headers: getAuthHeader()
  });
  return res.json();
};

export const addComment = async (postId, content) => {
  const res = await fetch(`${API_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify({ content })
  });
  return res.json();
};
