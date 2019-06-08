import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `http://localhost:${process.env.PORT_API || '4000'}`,
  headers: { 'Content-type': 'application/json' },
});

export default axiosInstance;
