import { getNewTokens, getUserInfo } from "@/api/user";
import { useLoginStore } from "@/store/store";
import { useEffect } from "react";

export default function useRefreshTokenAlive() {
  // 페이지 첫 진입 시

  const { login, logout } = useLoginStore();

  useEffect(() => {
    const refreshtoken = localStorage
      .getItem("refreshtoken")
      ?.replaceAll('"', "");

    const updateTokens = async () => {
      const response = await getNewTokens();

      if (response.status == 200) {
        const userInfo = await getUserInfo();
        login(userInfo.data);
      } else if (response.status == 401) {
        logout();
      }
    };
    if (refreshtoken) {
      updateTokens();
    }
  }, []);
  return null;
}
