// const API_URL = "https://maurita-digressional-shonta.ngrok-free.dev/api/forum";
const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
  // "ngrok-skip-browser-warning": "true"
});

export const fetchPosts = async () => {
  const res = await fetch(`${API_URL}/forum/posts`, {
    headers: getAuthHeader()
  });
  return res.json();
};

export const createPost = async (content) => {
  const res = await fetch(`${API_URL}/forum/posts`, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify({ content })
  });
  return res.json();
};

export const toggleLikePost = async (postId) => {
  const res = await fetch(`${API_URL}/forum/posts/${postId}/like`, {
    method: "POST",
    headers: getAuthHeader()
  });
  return res.json();
};

export const toggleSavePost = async (postId) => {
  const res = await fetch(`${API_URL}/forum/posts/${postId}/save`, {
    method: "POST",
    headers: getAuthHeader()
  });
  return res.json();
};

export const fetchComments = async (postId) => {
  const res = await fetch(`${API_URL}/forum/posts/${postId}/comments`, {
    headers: getAuthHeader()
  });
  return res.json();
};

export const addComment = async (postId, content) => {
  const res = await fetch(`${API_URL}/forum/posts/${postId}/comments`, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify({ content })
  });
  return res.json();
};
