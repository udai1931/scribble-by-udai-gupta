import axios from "axios";

const update = payload => axios.put("/sitedetails", payload);

const sitedetailsApi = {
  update,
};

export default sitedetailsApi;
