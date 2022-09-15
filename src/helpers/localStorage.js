export const setItem = (key, value) => {
  !key || !value ? null : localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.log("localStorage error");
  }
};
