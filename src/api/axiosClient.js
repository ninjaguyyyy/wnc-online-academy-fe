import axios from 'axios';
import queryString from 'query-string';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const axiosClient = axios.create({
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const token = cookies.get('token');
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  },
);
export default axiosClient;