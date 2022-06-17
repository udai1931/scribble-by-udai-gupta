const setToLocalStorage = ({ authToken, expiry }) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
  localStorage.setItem("expiry", JSON.stringify(expiry));
};

const getFromLocalStorage = key => JSON.parse(localStorage.getItem(key));

export { setToLocalStorage, getFromLocalStorage };
