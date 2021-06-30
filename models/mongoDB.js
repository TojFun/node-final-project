class MongoDB {
  constructor(mongoose, schemaName, schemaDefinition) {
    this.MongoDBModel = mongoose.model(
      schemaName,
      new mongoose.Schema(schemaDefinition),
      schemaName
    );
  }

  get = async (conditions = {}) => {
    return await this.MongoDBModel.find(conditions).exec();
  };

  post = async (obj) => await this.MongoDBModel.create(obj);

  put = async (id, object) => {
    const data = await get(id);

    const newObject = Object.assign(data, object);

    return await this.MongoDBModel.findByIdAndUpdate(id, newObject).exec();
  };

  delete = async (id) => await this.MongoDBModel.findByIdAndDelete(id).exec();
}

module.exports = MongoDB;
