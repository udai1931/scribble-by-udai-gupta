import axios from "axios";

const list = () => axios.get("/categories");

const create = payload => axios.post("/categories", payload);

const update = ({ id, payload }) => axios.put(`/categories/${id}`, payload);

const destroy = ({ id }) => axios.delete(`/categories/${id}`);

const listArticlesByCategory = ({ id }) =>
  axios.get(`/categories/${id}/index_articles_by_category`);

const listArticlesByCategories = () =>
  axios.get("/categories/index_articles_by_categories");

const categoriesApi = {
  list,
  create,
  update,
  destroy,
  listArticlesByCategory,
  listArticlesByCategories,
};

export default categoriesApi;
