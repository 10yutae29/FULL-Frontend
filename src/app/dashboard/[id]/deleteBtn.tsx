"use client";
import { deleteArticle } from "@/api/article";
import Btn from "@/components/Btn";
import { customRevalidatePath } from "@/utils/customRevalidatePath";
import { useRouter } from "next/navigation";

interface Props {
  article_id: string;
  user_id: string;
}

export default function DeleteBtn({ article_id, user_id }: Props) {
  const router = useRouter();
  const deleteData = async () => {
    try {
      const response = await deleteArticle({
        article_id: article_id,
        user_id: user_id,
      });
      if (response.status == 200 || response.status == 404) {
        customRevalidatePath("/dashboard");
        return router.push("/dashboard");
      }
    } catch (err: unknown) {
      console.error("An unknown error occurred");
    }
  };
  return (
    <Btn type="button" onClick={deleteData}>
      삭제
    </Btn>
  );
}
