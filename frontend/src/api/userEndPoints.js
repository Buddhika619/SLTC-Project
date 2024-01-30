import api from './api.js'

export const viewPendingUsers = async () => {
  return api.get(`/api/users/unapproved`);
};


export const deletePendingUser = async (id) => {
  return api.delete(`/api/users/${id}`);
};



export const getallPosts = async () => {
  return api.get(`/api/posts/filter?filter=date`);
};

export const createPost = async (post) => {
  return api.post(`/api/posts`, post);
};

export const updatePost = async (post) => {
  return api.put(`/api/posts/${post.id}?status=${post.status}`);
};

export const rejectFeedback = async (feedback) => {
  if (feedback.feedback) {
    return api.post(`/api/posts/${feedback.id}/feedback`, feedback);
  }
};



export const getUserPosts = async () => {
  return api.get(`/api/posts/userpost`);
};

export const getSinglePost = async (queryObj) => {
  const id = queryObj.queryKey[1];
  return api.get(`/api/posts/${id}`);
};

export const postComment = async (comment) => {
  return api.post(`/api/posts/${comment.id}/comment`, comment);
};