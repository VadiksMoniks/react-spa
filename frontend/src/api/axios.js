import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost/react-spa/backend/public/api',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const axiosPrivateClient = axios.create({
  baseURL: 'http://localhost/react-spa/backend/public/api',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

axiosPrivateClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Authorization header set:', config.headers.Authorization);
  }
  return config;
});

export default axiosClient;
