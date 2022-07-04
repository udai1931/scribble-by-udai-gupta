import axios from "axios";

const listOnSearch = ({ text = "" }) =>
  axios.get(`/eui/articles?title=${text}`);

const articlesEuiApi = {
  listOnSearch,
};

export default articlesEuiApi;
