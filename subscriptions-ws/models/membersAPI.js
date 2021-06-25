const axios = require("axios");
const path = "https://jsonplaceholder.typicode.com/users";

exports.getAll = async () => {
  return (await axios.get(path)).data;
};
