import axios from "axios";

const listOnSearch = ({ text = "" }) =>
  axios.get(`/eui/articles?title=${text}`);

const euiApi = {
  listOnSearch,
};

export default euiApi;
