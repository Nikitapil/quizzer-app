import axios from 'axios';
import { getAuthToken, setAuthToken } from '@/helpers/token-helpers';

const $api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
});

$api.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${getAuthToken()}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      // eslint-disable-next-line no-underscore-dangle
      !error.config._isRetry
    ) {
      try {
        // eslint-disable-next-line no-underscore-dangle
        originalRequest._isRetry = true;
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          {
            withCredentials: true
          }
        );
        setAuthToken(response.data.accessToken);
        return await $api.request(originalRequest);
      } catch (e) {
        throw error;
      }
    }
    throw error;
  }
);

export default $api;
