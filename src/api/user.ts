import { api } from "./api";

export const getUserInfo = async () => {
  const response = await api.get("/user/info");
  return response;
};

export const getNewTokens = async (refreshtoken: string) => {
  const response = await api.get("/token/refresh", {
    headers: {
      refreshtoken,
    },
  });

  if (response.status == 200) {
    const accessToken = response.headers.authorization.replace("Bearer ", "");
    const refreshToken = response.headers.refreshtoken;
    localStorage.setItem("accesstoken", accessToken);
    localStorage.setItem("refreshtoken", refreshToken);
  } else if (response.status == 401) {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
  }

  return response;
};

export const getLogin = async (code: string) => {
  const response = await api.post("/user/login", {
    code,
  });
  if (response.status == 200) {
    const accessToken = response.headers.authorization.replace("Bearer ", "");
    const refreshToken = response.headers.refreshtoken;
    localStorage.setItem("accesstoken", accessToken as string);
    localStorage.setItem("refreshtoken", refreshToken as string);
    return response;
  }
};
