const usersDB = require("../models/usersDB");

const {
  users: usersJSON,
  permissions: permissionsJSON,
  permissionsAvailable: permissionsAvailableJSON,
} = require("../models/jsonInterfaces");

// get all permissions available:
let permissionsAvailable;

(async () => {
  permissionsAvailable = (await permissionsAvailableJSON.get()).permissions;
})();

/* Functions: */

// Main Functions:
async function getUser(condition) {
  if (!((condition.password && condition.username) || condition._id))
    return null;

  const user = formatDBUser((await usersDB.get(condition))[0]);

  const userData = await getUserData(user.id, usersJSON);
  const { permissions } = await getUserData(user.id, permissionsJSON);

  return Object.assign(user, userData, { permissions });
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
  const permissions = permissionsAvailable.map((permission) => {
    return {
      ...permission,
      on: userPermissions.includes(permission.permission),
    };
  });

  return permissions;
}

async function updateUser(id, newUser) {
  const { firstName, lastName, username, sessionTimeOut } = newUser;

  const jsonUser = { firstName, lastName, sessionTimeOut };
  const permissions = getNewUserPermissions(newUser);

  await updateJSONUsers(id, usersJSON, (user) => Object.assign(user, jsonUser));
  await updateJSONUsers(id, permissionsJSON, (user) => {
    return { id, permissions };
  });

  await usersDB.put(id, (data) => Object.assign(data, { username }));
}

async function createUser(newUser) {
  const { firstName, lastName, username, sessionTimeOut } = newUser;

  const permissions = getNewUserPermissions(newUser);

  const { id } = await usersDB.post({ username, password: "NONE" });

  await createJSONUser(usersJSON, {
    id,
    firstName,
    lastName,
    sessionTimeOut,
    creationDate: new Date().toJSON().slice(0, 10),
    role: "user",
  });

  await createJSONUser(permissionsJSON, { id, permissions });
}

async function deleteUser(id) {
  await usersDB.delete(id);
  await deleteJSONUser(id, usersJSON);
  await deleteJSONUser(id, permissionsJSON);
}

// Utils Functions:
async function getUserData(id, jsonfile) {
  const { users } = await jsonfile.get();
  return users.find((user) => user.id === id);
}

function getNewUserPermissions(newUser) {
  const permissions = [];

  permissionsAvailable.forEach((permission) => {
    if (newUser[permission.camelCase] === "on")
      permissions.push(permission.permission);
  });

  return permissions;
}

async function updateJSONUsers(id, jsonfile, whatToDo) {
  await jsonfile.update(({ users }) => {
    const index = users.findIndex((user) => user.id === id);

    users[index] = whatToDo(users[index]);

    return { users };
  });
}

async function createJSONUser(jsonfile, user) {
  await jsonfile.update(({ users }) => {
    users.push(user);

    return { users };
  });
}

async function deleteJSONUser(id, jsonfile) {
  await jsonfile.update(({ users }) => {
    const index = users.findIndex((user) => user.id === id);

    users.splice(index, 1);

    return { users };
  });
}
// nothing works without it
function formatDBUser(dbUser) {
  dbUser.id = dbUser._id.toString();
  delete dbUser._id;

  return dbUser;
} // although there must be better way using native mongoose.

module.exports = {
  getUser,
  getAllUsers,
  updateUser,
  createUser,
  deleteUser,
  getPermissions,
};
