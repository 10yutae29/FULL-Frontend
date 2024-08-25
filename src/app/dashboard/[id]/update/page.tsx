import { getArticle } from "@/api/article";
import Btn from "@/components/Btn";
import ClientForm from "./ClientForm";
import CancelBtn from "./CancelBtn";

interface Props {
  params: { id: string };
}

export default async function page({ params }: Props) {
  const data = await getData(params.id);

  return (
    <ClientForm id={params.id}>
      <div>
        <h2>게시글 수정</h2>
      </div>
      <div className="w-full flex flex-col gap-4">
        <p>제목</p>
        <input
          className="focus:outline-none w-full"
          type="text"
          defaultValue={data.title}
          name="title"
        />
      </div>
      <div className="w-full flex flex-col gap-4">
        <p>내용</p>
        <textarea
          className="focus:outline-none"
          defaultValue={data.content}
          name="content"
        />
      </div>
      <div className="flex justify-end w-full">
        <Btn type="submit">수정완료</Btn>
        <CancelBtn />
      </div>
    </ClientForm>
  );
}

async function getData(id: string) {
  const response = await getArticle(id);
  return response.data;
}
