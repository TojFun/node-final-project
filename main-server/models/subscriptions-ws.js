const axios = require("axios");
const PATH = "http://localhost:8000/";

class SubscriptionWSClient {
  constructor(route) {
    this.path = PATH + route + "/";
  }

  async get(id = "") {
    return await axios.get(this.path + id);
  }

  async post() {
    return await axios.post(this.path);
  }

  async put(id) {
    return await axios.put(this.path + id);
  }

  async delete(id) {
    return await axios.delete(this.path + id);
  }
}

module.exports = {
  members: new SubscriptionWSClient("members"),
  movies: new SubscriptionWSClient("movies"),
  subscriptions: new SubscriptionWSClient("subscriptions"),
};
