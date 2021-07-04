class MongoDB {
  constructor(mongoose, schemaName, schemaDefinition) {
    this.MongoDBModel = mongoose.model(
      schemaName,
      new mongoose.Schema(schemaDefinition),
      schemaName
    );
  }

  get = async (conditions = {}) => {
    if (typeof conditions !== "object")
      return await this.MongoDBModel.findByID(conditions).exec();
    return await this.MongoDBModel.find(conditions).exec();
  };

  post = async (obj) => await this.MongoDBModel.create(obj);

  put = async (id, whatToDo) => {
    const data = await this.get({ _id: id });

    const newObject = whatToDo(data);

    return await this.MongoDBModel.findByIdAndUpdate(id, newObject).exec();
  };

  delete = async (id) => await this.MongoDBModel.findByIdAndDelete(id).exec();
}

module.exports = MongoDB;
