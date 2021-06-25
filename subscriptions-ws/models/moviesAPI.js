const axios = require("axios");
const path = "https://api.tvmaze.com/shows";

exports.getAll = async () => {
  return (await axios.get(path)).data;
};
