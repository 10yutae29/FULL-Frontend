"use client";
import Btn from "@/components/Btn";
import { useLoginStore } from "@/store/store";
import { useParams, useRouter } from "next/navigation";

export default function UpdateBtn({ writer_id }: { writer_id: string }) {
  const router = useRouter();
  const { id } = useParams();
  const goUpdate = () => {
    router.push(`/dashboard/${id}/update`);
  };
  const userInfo = useLoginStore((state) => state.userInfo);
  return (
    <>
      {userInfo.id == writer_id && (
        <div>
          <Btn onClick={goUpdate}>수정하기</Btn>
        </div>
      )}
    </>
  );
}
