"use client";
import Btn from "@/components/Btn";
import { useRouter } from "next/navigation";

export default function CancelBtn() {
  const router = useRouter();
  return (
    <Btn type="button" onClick={router.back}>
      취소
    </Btn>
  );
}
