import axios from "axios";

const list = () => axios.get("/redirections");

const create = payload => axios.post("/redirections", payload);

const update = ({ id, payload }) => axios.put(`/redirections/${id}`, payload);

const destroy = ({ id }) => axios.delete(`/redirections/${id}`);

const redirectionsApi = {
  list,
  create,
  update,
  destroy,
};

export default redirectionsApi;
