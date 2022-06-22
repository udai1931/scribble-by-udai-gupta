const setToLocalStorage = (key, value) => {
  if (value !== null) {
    localStorage.setItem(key, JSON.stringify(value));
  } else localStorage.removeItem(key);
};

const getFromLocalStorage = key => {
  const value = localStorage.getItem(key);
  const response = value ? JSON.parse(value) : "";
  return response;
};

const clearFromLocalStorage = () => {
  setToLocalStorage("authToken", null);
  setToLocalStorage("expiry", null);
};

export { setToLocalStorage, getFromLocalStorage, clearFromLocalStorage };
