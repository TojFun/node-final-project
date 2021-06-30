const JSONFile = require("./jsonfile");

const users = new JSONFile("users");
const permissions = new JSONFile("permissions");
const permissionsAvailable = new JSONFile("permissions-available");

module.exports = { users, permissions, permissionsAvailable };
