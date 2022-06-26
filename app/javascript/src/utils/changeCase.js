export const startCase = value => {
  if (value) {
    return value[0].toUpperCase() + value.substring(1);
  }

  return "";
};
