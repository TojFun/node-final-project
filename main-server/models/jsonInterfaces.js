const JSONFile = require("./jsonfile");

const users = new JSONFile("users");
const permissions = new JSONFile("permissions");

module.exports = { users, permissions };
