import Axios from "axios";
import { apiBaseUrl } from "../config/Config";

export const Keys = {
  AUTH_STATE: "AUTH-STATE",
};

export const getAxios = () => {
  const axiosInstance = Axios.create({
    baseURL: apiBaseUrl,
  });
  axiosInstance.interceptors.request.use((config) => {
    const authToken = localStorage.getItem(Keys.AUTH_STATE);

    if (authToken) {
      const token = authToken;

      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem(Keys.AUTH_STATE);
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
