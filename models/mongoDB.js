class MongoDB {
  constructor(mongoose, schemaName, schemaDefinition) {
    this.MongoDBModel = mongoose.model(
      schemaName,
      new mongoose.Schema(schemaDefinition),
      schemaName
    );
  }

  get = async (conditions = {}) =>
    await this.MongoDBModel.find(conditions).exec();

  post = async (obj) => await this.MongoDBModel.create(obj);

  put = async (id, whatToDo) => {
    const data = (await this.get({ _id: id }))[0];

    const newObject = whatToDo(data);

    await this.MongoDBModel.findByIdAndUpdate(id, newObject).exec();

    return newObject;
  };

  delete = async (id) => await this.MongoDBModel.findByIdAndDelete(id).exec();
}

module.exports = MongoDB;
