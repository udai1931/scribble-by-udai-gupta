import axios from "axios";

const list = ({ text = "", page = "" } = {}) =>
  axios.get(`/articles?search=${text}&page=${page}`);

const create = payload => axios.post("/articles", payload);

const show = (slug, visitFromEUI = false) =>
  axios.get(`/articles/${slug}?eui=${visitFromEUI}`);

const update = ({ slug, payload }) => axios.put(`/articles/${slug}`, payload);

const destroy = slug => axios.delete(`/articles/${slug}`);

const listByState = payload => axios.post(`/articles/list_by_state`, payload);

const versions = slug => axios.get(`/articles/${slug}/versions`);

const articlesApi = {
  list,
  create,
  show,
  update,
  destroy,
  listByState,
  versions,
};

export default articlesApi;
