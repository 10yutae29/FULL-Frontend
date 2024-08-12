"use client";
import useRefreshTokenAlive from "@/hooks/useRefreshTokenAlive";
import { useLoginStore } from "@/store/store";
import Link from "next/link";

export default function Navbar() {
  const { userInfo, isLogined, logout } = useLoginStore();

  const onClickLogin = async () => {
    const REST_API_KEY = "535e5680b675f60dd1749dc6d5eac95b";
    const REDIRECT_URI = "http://localhost:3000/kakao/redirect";
    const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
    document.location.href = url;
  };

  const onClickLogout = () => {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
    logout();
  };

  useRefreshTokenAlive();

  return (
    <nav className="h-20 w-full bg-blue-500 flex justify-between text-4xl font-bold text-white px-12">
      <ul className=" flex items-center justify-around gap-20  ">
        <li>
          <Link href={"/"} className="hover:text-blue-900 cursor-pointer">
            홈
          </Link>
        </li>
        <li>
          <Link
            href={"/dashboard"}
            className="hover:text-blue-900 cursor-pointer"
          >
            게시판
          </Link>
        </li>
        <li>
          <Link
            href={"/chatting"}
            className="hover:text-blue-900 cursor-pointer"
          >
            채팅
          </Link>
        </li>
      </ul>
      <ul className="flex h-full items-center gap-8 ">
        {isLogined ? (
          <>
            <li className="text-base cursor-pointer">{userInfo.nickname}</li>
            <li className="text-base cursor-pointer" onClick={onClickLogout}>
              로그아웃
            </li>
          </>
        ) : (
          <li className="text-base cursor-pointer" onClick={onClickLogin}>
            로그인
          </li>
        )}
      </ul>
    </nav>
  );
}
