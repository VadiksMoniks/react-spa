import axiosClient, { axiosPrivateClient } from './axios';

export function totalPosts(page = 1) {
  return axiosClient.get(`/posts/total`);
}

export function getPosts(page = 1) {
  return axiosClient.get(`/posts?page=${page}`);
}

export function getPost(id) {
  return axiosClient.get(`/posts/${id}`);
}

export function create(data) {
  return axiosPrivateClient.post('/posts/create', data);
}

export function update(post_id, data) {
  return axiosPrivateClient.put(`/posts/${post_id}/update`, data);
}

export function deletePost(post_id) {
  return axiosPrivateClient.post(`/posts/${post_id}/delete`);
}