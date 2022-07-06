import axios from "axios";

const list = ({ page = 1 } = {}) => axios.get(`/articles?page=${page}`);

const create = payload => axios.post("/articles", payload);

const show = (slug, visitFromEUI = false) =>
  axios.get(`/articles/${slug}?eui=${visitFromEUI}`);

const update = ({ slug, payload }) => axios.put(`/articles/${slug}`, payload);

const destroy = slug => axios.delete(`/articles/${slug}`);

const listByState = ({ page = 1, payload }) =>
  axios.post(`/articles/list_by_state?page=${page}`, payload);

const versions = slug => axios.get(`/articles/${slug}/versions`);

const countByState = () => axios.get(`/articles/count_by_state`);

const listInOrderOfVisits = ({ page = 1 }) =>
  axios.get(`/articles/list_in_order_of_visits?page=${page}`);

const listUpdateSchedules = slug =>
  axios.get(`/articles/${slug}/list_schedules`);

const createUpdateSchedule = ({ slug, payload }) =>
  axios.post(`/articles/${slug}/create_schedule`, payload);

const articlesApi = {
  list,
  create,
  show,
  update,
  destroy,
  listByState,
  versions,
  countByState,
  listInOrderOfVisits,
  listUpdateSchedules,
  createUpdateSchedule,
};

export default articlesApi;
