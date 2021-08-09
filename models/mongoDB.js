class MongoDB {
  constructor(mongoose, schemaName, schemaDefinition) {
    this.MongoDBModel = mongoose.model(
      schemaName,
      new mongoose.Schema(schemaDefinition),
      schemaName
    );
  }

  get = (conditions = {}) =>
    this.MongoDBModel.find(conditions)
      .exec()
      .then((data) => data.map((movie) => movie._doc));

  post = (obj) => this.MongoDBModel.create(obj);

  put = async (id, whatToDo) => {
    const data = (await this.get({ _id: id }))[0];

    const newObject = whatToDo(data);

    await this.MongoDBModel.findByIdAndUpdate(id, newObject).exec();

    return newObject;
  };

  delete = (id) => this.MongoDBModel.findByIdAndDelete(id).exec();
}

module.exports = MongoDB;
