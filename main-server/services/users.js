const usersDB = require("../models/usersDB");

const {
  users: usersJSON,
  permissions: permissionsJSON,
  permissionsAvailable: permissionsAvailableJSON,
} = require("../models/jsonInterfaces");

let permissionsAvailable;

async function getUserData(id, jsonfile) {
  const { users: allUsers } = await jsonfile.get();
  return allUsers.find((user) => user.id === id);
}

async function getUser(condition) {
  if (!((condition.password && condition.username) || condition._id))
    return null;

  const users = await usersDB.get(condition);

  if (users.length !== 1) return null;

  const userDB = formatDBUser(users[0]);

  const userData = await getUserData(userDB.id, usersJSON);
  const { permissions } = await getUserData(userDB.id, permissionsJSON);

  return Object.assign(userDB, userData, { permissions });
}

async function getAllUsers() {
  const dbUsers = await usersDB.get();
  const { users } = await usersJSON.get();
  const { users: permissions } = await permissionsJSON.get();

  const allUsers = dbUsers.map((dbUser) => {
    dbUser = formatDBUser(dbUser);

    return Object.assign(
      dbUser,
      users.find((user) => user.id == dbUser.id),
      permissions.find((permission) => permission.id == dbUser.id)
    );
  });

  return allUsers;
}

async function getPermissions({ permissions: userPermissions }) {
  permissionsAvailable =
    permissionsAvailable ?? (await permissionsAvailableJSON.get()).permissions;

  const permissions = permissionsAvailable.map((permission) => {
    return { permission, on: userPermissions.includes(permission) };
  });

  return permissions;
}

// nothing works without it
function formatDBUser(dbUser) {
  const userFromDB = dbUser._doc;
  userFromDB.id = userFromDB._id.toString();
  delete userFromDB._id;

  return userFromDB;
} // although, there must be better, probably way using native mongoose.

module.exports = { getUser, getAllUsers, getPermissions };
