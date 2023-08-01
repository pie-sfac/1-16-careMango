import axios from 'axios';
import { useEffect } from 'react';

const useTokenRefresher = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/tokens`,
      {},
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
        },
      },
    );

    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
  } catch (error) {
    console.error(error);
  }
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest.isRetry) {
      originalRequest.isRetry = true;

      try {
        // Wait for token refresh to complete
        await useTokenRefresher();

        // Update Authorization header with new token
        originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;

        // Retry the original request
        return await axiosInstance(originalRequest);
      } catch (err) {
        console.error(err);
        // handle error appropriately
      }
    }

    // If error was not 401 or there is another issue, reject the promise
    return Promise.reject(error);
  },
);

export { axiosInstance, useTokenRefresher };
