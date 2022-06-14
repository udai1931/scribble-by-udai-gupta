import axios from "axios";

const update = payload => axios.put("/sitedetails", payload);

const show = () => axios.get("/sitedetails");

const sitedetailsApi = {
  update,
  show,
};

export default sitedetailsApi;
