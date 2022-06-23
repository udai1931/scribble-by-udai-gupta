import axios from "axios";

const update = payload => axios.put("/organization", payload);

const show = () => axios.get("/organization");

const organizationApi = {
  update,
  show,
};

export default organizationApi;
