import { SERVER_URL } from '@/constants';
import { useAuthStore } from '@/store/auth-store';
import { refreshToken } from '@/api/auth.api';
import axios, { AxiosError } from 'axios';

// Create an instance of axios
const baseConfig = {
  baseURL: SERVER_URL,
  withCredentials: true,
};

export const instanceWithoutInterceptors =
  axios.create(baseConfig);

export const instance = axios.create(baseConfig);

instance.interceptors.request.use(
  function (config) {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (
      error.response?.status === 403 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const response = await refreshToken();

        const { accessToken } = response;

        useAuthStore.setState({ accessToken });

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return instance(originalRequest);
      } catch (error) {
        if (
          error instanceof AxiosError &&
          error.response?.status === 403
        ) {
          useAuthStore.getState().logOut();
          return;
        }
      }
    }
    return Promise.reject(error);
  },
);
