import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserInfo {
  [key: string]: number | string;
}

interface LoginState {
  isLogined: boolean;
  userInfo: UserInfo;
  login: (userinfo: any) => void;
  logout: () => void;
}
export const useLoginStore = create(
  persist<LoginState>(
    (set, get) => ({
      isLogined: false,
      userInfo: {},
      login: (userInfo: any) => set({ isLogined: true, userInfo: userInfo }),
      logout: () => set({ isLogined: false, userInfo: {} }),
    }),
    {
      name: "user-storage",
    }
  )
);
