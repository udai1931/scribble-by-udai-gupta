import axios from "axios";

const list = () => axios.get("/articles");

const create = payload => axios.post("/articles", payload);

const show = slug => axios.get(`/articles/${slug}`);

const count = () => axios.get("/articles/count");

const listByState = payload => axios.post(`/articles/state`, payload);

const listByCategory = payload => axios.post(`/articles/category`, payload);

const articlesApi = {
  list,
  create,
  show,
  count,
  listByState,
  listByCategory,
};

export default articlesApi;
