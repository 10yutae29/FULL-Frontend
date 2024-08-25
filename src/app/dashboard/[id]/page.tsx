import { getArticle } from "@/api/article";
import { dateFormat } from "@/utils/date";
import DeleteBtn from "./deleteBtn";
import UpdateBtn from "./UpdateBtn";

export default async function page({ params }: { params: { id: string } }) {
  interface Article {
    title: string;
    nickname: string;
    content: string;
    created_at: string;
    user_id: string;
    article_id: string;
  }
  const article: Article = await getData(params.id);

  return (
    <div>
      <div>{article.title}</div>
      <div>{article.nickname}</div>
      <div>{dateFormat(article.created_at as string)}</div>
      <div>{article.content}</div>
      <DeleteBtn article_id={article.article_id} user_id={article.user_id} />
      <UpdateBtn writer_id={article.user_id} />
    </div>
  );
}

async function getData(id: string) {
  const response = await getArticle(id);
  return response.data;
}
