import axios from "axios";

const list = () => axios.get("/categories");

const create = payload => axios.post("/categories", payload);

const update = ({ id, payload }) => axios.put(`/categories/${id}`, payload);

const destroy = ({ id }) => axios.delete(`/categories/${id}`);

const listArticlesByCategory = ({ id, page = 1, search = "" }) =>
  axios.get(`/categories/${id}/list_articles?page=${page}&title=${search}`);

const listArticlesByCategories = () =>
  axios.get("/categories/list_articles_in_order");

const categoriesApi = {
  list,
  create,
  update,
  destroy,
  listArticlesByCategory,
  listArticlesByCategories,
};

export default categoriesApi;
