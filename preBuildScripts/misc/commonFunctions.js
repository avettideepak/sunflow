const setTime = (functionFetch, i) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => functionFetch(resolve, reject), 3500 * (i + 1));
  });
};

const setTimeStore = (functionFetch, i, data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => functionFetch(resolve, reject, data), 2500 * (i + 1));
  });
};

const setTimeFree = (functionFetch, i) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => functionFetch(resolve, reject), 75 * (i + 1));
  });
};

const setTimePreview = (functionFetch, i, code, listOfURL) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      functionFetch(code, resolve, reject, listOfURL);
    }, 1500 * (i + 1));
  });
};

module.exports = { setTime, setTimeFree, setTimeStore, setTimePreview };
