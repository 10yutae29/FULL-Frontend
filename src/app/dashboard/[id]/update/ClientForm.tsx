"use client";

import { updateArticle } from "@/api/article";
import { customRevalidatePath } from "@/utils/customRevalidatePath";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  id: string;
}

export default function ClientForm({ children, id }: Props) {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    const res = await updateArticle(data, id);
    if (res.status === 200) {
      customRevalidatePath(`/dashboard/${id}/update`);
    } else {
      alert("게시물을 찾을 수 없거나 권한이 없습니다.");
    }
    router.push(`/dashboard/${id}`);
  };

  return (
    <form
      className="w-full flex flex-col items-center text-xl gap-4"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}
