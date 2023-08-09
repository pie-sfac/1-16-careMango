import axios from 'axios';

interface Tokens {
  refreshToken: string;
  accessToken: string;
}

const useTokenRefresher: () => Promise<Tokens | null> = async () => {
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

    const newAccessToken: string = response.data.accessToken;
    const newRefreshToken: string = response.data.refreshToken;
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    return { refreshToken: newRefreshToken, accessToken: newAccessToken };
  } catch (error) {
    console.error(error);
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    return null;
  }
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 토큰 갱신 중인지 여부
let isRefreshing: boolean = false;
// 네트워크 대기열
let watingApiQueue: { resolve: (value: unknown) => void; reject: (reason?: unknown) => void }[] = [];

// 대기열 일괄 처리
const runWatingApiQueue = (error: unknown, token: string | null = null) => {
  watingApiQueue.forEach((p) => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve(token);
    }
  });
  watingApiQueue = [];
};

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    console.log(err);
  },
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (!localStorage.getItem('refreshToken')) {
      // window.location.href = '/';
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401 && !originalRequest.isRetry) {
      // 이미 토큰 갱신 중이라면
      if (isRefreshing) {
        // 작업 큐에 담아놓고 resolve되는 경우 일괄 처리
        return new Promise((resolve, reject) => {
          watingApiQueue.push({ resolve, reject });
        }).then((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        });
        // .catch((err) => err);
      }
      isRefreshing = true;
      originalRequest.isRetry = true;

      try {
        // Wait for token refresh to complete
        const newTokens = await useTokenRefresher();
        isRefreshing = false;
        if (newTokens == null) {
          window.location.href = '/'; // 로그인 페이지로 이동
          return await Promise.reject(error);
        }
        // Update Authorization header with new token
        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;

        // Retry the original request
        runWatingApiQueue(null, newTokens.accessToken);
        return await axiosInstance(originalRequest);
      } catch (err) {
        runWatingApiQueue(err);
        console.error(err);
      }
    }

    // If error was not 401 or there is another issue, reject the promise
    return Promise.reject(error);
  },
);

export { axiosInstance, useTokenRefresher };
