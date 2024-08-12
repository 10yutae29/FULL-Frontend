// "use client";

import { getAllArticles } from "@/api/article";
import Btn from "@/components/Btn";
import { dateFormat } from "@/utils/date";
import Link from "next/link";

export default async function page() {
  const menu = ["제목", "작성자", "작성 일시"];
  interface Data {
    title: string;
    nickname: string;
    created_at: string;
    id: string;
  }
  const datas = await getData();
  // const [datas, setDatas] = useState<Data[]>([]);
  // const datas = [
  //   {
  //     title: "12",
  //     nickname: "134",
  //     created_at: "1242342",
  //     id: 3,
  //   },
  // ];
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await getAllArticles();
  //       // setDatas(data);
  //     } catch (error) {
  //       console.error("Fetch error:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <main className="flex flex-col items-center gap-10">
      <header className="text-3xl font-semibold">게시글 목록</header>
      <table className="border border-sky-400">
        <thead>
          <tr>
            {menu.map((m) => {
              return (
                <th key={m} className="px-4 border-sky-400 border">
                  {m}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {datas?.map((data: Data, idx: number) => {
            return (
              <tr key={idx}>
                <td className="border border-sky-400 text-center">
                  <Link href={`/dashboard/${data.id}`}>{data.title}</Link>
                </td>
                <td className="border border-sky-400 text-center">
                  {data.nickname}
                </td>
                <td className="border border-sky-400 text-center">
                  {dateFormat(data.created_at)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="w-full flex justify-end">
        <Link href="/dashboard/newarticle">
          <Btn>글쓰기</Btn>
        </Link>
      </div>
    </main>
  );
}

async function getData() {
  const response = await getAllArticles();
  return response.data;
}
