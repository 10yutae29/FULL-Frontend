import { api, apiNotLogin } from "./api";

export const getAllArticles = async () => {
  const response = await apiNotLogin.get("/article");
  return response;
};

export const getArticle = async (id: string) => {
  const response = await apiNotLogin.get(`/article?id=${id}`);
  return response;
};

interface PostPayload {
  title: string;
  content: string;
}
export const postArticle = async (payload: PostPayload) => {
  const response = await api.post(`/article`, payload);
  return response;
};

interface DeletePayload {
  article_id: string;
  user_id: string;
}
export const deleteArticle = async (article: DeletePayload) => {
  const response = await api.delete(
    `/article?article_id=${article.article_id}&user_id=${article.user_id}`
  );
  return response;
};
