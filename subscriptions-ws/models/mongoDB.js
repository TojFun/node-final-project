const mongoose = require("mongoose");
const { Schema } = mongoose;

class MongoDB {
  constructor(schemaName, schemaDefinition) {
    this.MongoDBModel = mongoose.model(
      schemaName,
      new Schema(schemaDefinition),
      schemaName
    );
  }

  get = async (id = null) => {
    if (id === null) return await this.MongoDBModel.find().exec();

    return await this.MongoDBModel.findById(id).exec();
  };

  post = async (obj) => await this.MongoDBModel.create(obj);

  put = async (id, object) => {
    const data = await get(id);

    const newObject = Object.assign(data, object);

    return await this.MongoDBModel.findByIdAndUpdate(id, newObject).exec();
  };

  delete = async (id) => await this.MongoDBModel.findByIdAndDelete(id).exec();
}

module.exports = {
  movies: new MongoDB("movies", {
    name: { type: String, required: true },
    genres: { type: Array, required: true },
    image: { type: String, required: true },
    premiered: { type: Date, required: true },
  }),

  members: new MongoDB("members", {
    name: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
  }),

  subscriptions: new MongoDB("subscriptions", {
    memberID: { type: String, required: true },
    movies: { type: Array, required: true },
  }),
};
