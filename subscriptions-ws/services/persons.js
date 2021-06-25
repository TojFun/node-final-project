const Person = require("../models/movies");

async function get(id = null) {
  if (id === null) return await Person.find().exec();

  return await Person.findById(id).exec();
}

async function post(obj) {
  return await Person.create(obj);
}

async function put(id, object) {
  const data = await get(id);

  const newObject = Object.assign(data, object);

  return await Person.findByIdAndUpdate(id, newObject).exec();
}

async function deleteByID(id) {
  return await Person.findByIdAndDelete(id).exec();
}

module.exports = { get, post, put, delete: deleteByID };
