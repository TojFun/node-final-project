const axios = require("axios");
const PATH = "http://localhost:8000/";

class SubscriptionWSClient {
  constructor(route) {
    this.path = PATH + route + "/";
  }

  get = async (id = "") => (await axios.get(this.path + id)).data;

  post = async (data) => await axios.post(this.path, data);

  put = async (id, data) => await axios.put(this.path + id, data);

  delete = async (id) => await axios.delete(this.path + id);
}

module.exports = {
  members: new SubscriptionWSClient("members"),
  movies: new SubscriptionWSClient("movies"),
  subscriptions: new SubscriptionWSClient("subscriptions"),
};
