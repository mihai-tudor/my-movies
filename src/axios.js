import axios from 'axios';

const baseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return { baseURL: 'http://localhost:4000' };
  }
  return {};
};

const axiosInstance = axios.create({
  ...baseUrl(),
  headers: { 'Content-type': 'application/json' },
});

export default axiosInstance;
