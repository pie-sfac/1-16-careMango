import axios from 'axios';
import { useEffect } from 'react';

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
  (error) => Promise.reject(error),
);

const useTokenRefresher = () => {
  useEffect(() => {
    const interval = setInterval(
      () => {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/tokens`,
            {},
            {
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
              },
            },
          )
          .then((response) => {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
          })
          .catch((error) => {
            console.error(error);
          });
      },
      13 * 60 * 1000,
    );

    return () => {
      clearInterval(interval);
    };
  }, []);
};

export { axiosInstance, useTokenRefresher };
