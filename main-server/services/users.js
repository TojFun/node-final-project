const usersDB = require("../models/usersDB");

const {
  users: usersJSON,
  permissions: permissionsJSON,
  permissionsAvailable: permissionsAvailableJSON,
} = require("../models/jsonInterfaces");

const placeHolderPassword = "no-password-has-been-provided";

// get all permissions available:
let permissionsAvailable;

(async () => {
  permissionsAvailable = (await permissionsAvailableJSON.get()).permissions;
})();

/* Functions: */

function login({ username, password }) {
  if (!(password && username) || password === placeHolderPassword) return null;

  return getUser({ username, password });
}

// Main Functions:
async function getUser(condition) {
  const users = await usersDB.get(condition);

  if (users.length < 1) return null;

  const [user] = users;

  const userData = await getUserData(user._id, usersJSON);
  const { permissions } = await getUserData(user._id, permissionsJSON);

  return Object.assign(user, userData, { permissions });
}

async function getAllUsers() {
  const dbUsers = await usersDB.get();
  const { users } = await usersJSON.get();
  const { users: permissions } = await permissionsJSON.get();

  const allUsers = dbUsers.map((dbUser) => {
    return Object.assign(
      dbUser,
      users.find((user) => user.id == dbUser._id),
      permissions.find((permission) => permission.id == dbUser._id)
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

  if ((await usersDB.get({ username })).length > 0)
    return { status: "username-taken", ok: false };

  const permissions = getNewUserPermissions(newUser);

  const { id } = await usersDB.post({
    username,
    password: placeHolderPassword,
  });

  await createJSONUser(usersJSON, {
    id,
    firstName,
    lastName,
    sessionTimeOut,
    creationDate: new Date().toJSON().slice(0, 10),
    role: "user",
  });

  await createJSONUser(permissionsJSON, { id, permissions });

  return { ok: true, status: "added" };
}

async function deleteUser(id) {
  await usersDB.delete(id);
  await deleteJSONUser(id, usersJSON);
  await deleteJSONUser(id, permissionsJSON);
}

// Utils Functions:
async function getUserData(id, jsonfile) {
  const { users } = await jsonfile.get();
  return users.find((user) => user.id === id.toString());
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

async function createPassword({ username, password }) {
  if (password === placeHolderPassword)
    return { ok: false, status: "cant-have-password" };

  const users = await usersDB.get({ username });

  if (users.length < 1) return { ok: false, status: "could-not-find-user" };

  const [{ _id, password: currentPassword }] = users;

  if (currentPassword !== placeHolderPassword)
    return { ok: false, status: "user-already-have-password" };

  await usersDB.put(_id, () => password);

  return { ok: true, status: "noted" };
}

module.exports = {
  getUser,
  getAllUsers,
  updateUser,
  createUser,
  deleteUser,
  getPermissions,
  createPassword,
  login,
};
