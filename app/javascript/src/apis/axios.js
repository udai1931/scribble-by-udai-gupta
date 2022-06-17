import axios from "axios";
import { Toastr } from "neetoui";

axios.defaults.baseURL = "/";

const setAuthHeaders = (setLoading = () => null) => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      .getAttribute("content"),
  };
  const token = localStorage.getItem("authToken");
  const expiry = localStorage.getItem("expiry");
  if (token && expiry) {
    axios.defaults.headers["X-Auth-Token"] = JSON.parse(token);
    axios.defaults.headers["X-Auth-Expiry"] = `${expiry}`;
  }
  setLoading(false);
};

const handleSuccessResponse = response => {
  if (response) {
    response.success = response.status === 200;
    if (response.data.notice) {
      Toastr.success(response.data.notice);
    }
  }

  return response;
};

const handleErrorResponse = axiosErrorObject => {
  if (axiosErrorObject.response?.status === 401) {
    // setToLocalStorage({ authToken: null, expiry: null});
    // setTimeout(() => (window.location.href = "/login"), 2000);
  }
  Toastr.error(
    axiosErrorObject.response?.data?.error || "Something went wrong!"
  );
  if (axiosErrorObject.response?.status === 423) {
    window.location.href = "/login";
  }

  return Promise.reject(axiosErrorObject);
};

const registerIntercepts = () => {
  axios.interceptors.response.use(handleSuccessResponse, error =>
    handleErrorResponse(error)
  );
};

export { setAuthHeaders, registerIntercepts };
