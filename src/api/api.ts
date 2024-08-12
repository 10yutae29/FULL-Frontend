import axios from "axios";

export const apiNotLogin = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage?.getItem("accesstoken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
