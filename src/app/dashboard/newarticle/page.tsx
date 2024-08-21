"use client";

import { postArticle } from "@/api/article";
import Btn from "@/components/Btn";
import { customRevalidatePath } from "@/utils/customRevalidatePath";
import { useRouter } from "next/navigation";
import React from "react";
interface Data {
  title: string;
  content: string;
}
export default function page() {
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data: Data = { title: "", content: "" };
    for (let i = 0; i < 2; i++) {
      data[(form[i] as HTMLInputElement).name as "title" | "content"] = (
        form[i] as HTMLInputElement
      ).value;
    }

    const res = await postArticle(data);
    if (res.status === 200) {
      customRevalidatePath("/dashboard");
      router.push(`/dashboard/${res.data.id}`);
    }
  };
  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex flex-col items-center text-xl gap-4"
    >
      <section>
        <h2>게시글 작성</h2>
      </section>
      <section className="w-full flex flex-col gap-4">
        <p>제목</p>
        <input type="text" name="title" className="w-full" />
      </section>
      <section className="w-full flex flex-col gap-4">
        <p>내용</p>
        <textarea className="w-full min-h-40" name="content"></textarea>
      </section>
      <Btn type="submit">작성완료</Btn>
    </form>
  );
}
