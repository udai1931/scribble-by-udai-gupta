import axios from "axios";

const list = () => axios.get("/categories");

const create = payload => axios.post("/categories", payload);

const update = ({ id, payload }) => axios.put(`/categories/${id}`, payload);

const destroy = ({ id }) => axios.delete(`/categories/${id}`);

const articles = () => axios.get("/categories/articles");

const categoriesApi = {
  list,
  create,
  update,
  destroy,
  articles,
};

export default categoriesApi;
