import axios from "axios";

const list = () => axios.get("/articles");

const create = payload => axios.post("/articles", payload);

const show = slug => axios.get(`/articles/${slug}`);

const count = () => axios.get("/articles/count");

const listByState = payload => axios.post(`/articles/state`, payload);

const listByCategory = payload => axios.post(`/articles/category`, payload);

const destroy = slug => axios.delete(`/articles/${slug}`);

const articlesApi = {
  list,
  create,
  show,
  count,
  listByState,
  listByCategory,
  destroy,
};

export default articlesApi;
