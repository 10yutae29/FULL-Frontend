import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { error } from "console";
import { getNewTokens } from "./user";

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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    console.log(error);
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      (error.response.data as { action?: number })["action"] === 3
    ) {
      // 액세스 토큰이 만료되었고, 아직 재시도되지 않은 경우
      originalRequest._retry = true;

      try {
        await getNewTokens();
        const newAccessToken = localStorage.getItem("accesstoken");

        // 새로운 access token을 헤더에 추가하여 원래 요청을 재시도
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        const apiRes = await api(originalRequest); // 원래의 요청을 다시 보냄
        console.log(apiRes);
      } catch (refreshError) {
        // 토큰 갱신 실패 시

        return refreshError;
      }
    }
    // else if (
    //   error.response?.status === 401 &&
    //   (error.response.data as { action?: number })["action"] === 4
    // ) {
    //   // refresh token도 만료되었으면 에러 응답 반환
    //   // -> 이러면 user.ts의 getNewTokens에서 반환받은 값으로 refresh token 만료된거 확인 후 로그아웃
    //   return error.response;
    // }
    return error.response;
  }
);
