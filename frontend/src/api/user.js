import axiosClient, { axiosPrivateClient } from './axios';

export function profile() {
  return axiosPrivateClient.get('/user/profile');
}

export function login(data) {
  return axiosClient.post('/user/login', data);
}

export function register(data) {
  return axiosClient.post('/user/register', data);
}

export function logout(data) {
  return axiosPrivateClient.post('/user/logout', data);
}

export function resetPassword(data) {
  return axiosPrivateClient.put('/user/resetPassword', data);
}