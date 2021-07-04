const usersDB = require("../models/usersDB");

const {
  users: usersJSON,
  permissions: permissionsJSON,
  permissionsAvailable: permissionsAvailableJSON,
} = require("../models/jsonInterfaces");

let permissionsAvailable;

async function getUserData(id, jsonfile) {
  const { users } = await jsonfile.get();
  return users.find((user) => user.id === id);
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
  getAllPermissions();

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
  const permissions = await getNewUserPermissions(newUser)

  await updateUsersJSON(usersJSON, (user) => Object.assign(user, jsonUser));
  await updateUsersJSON(permissionsJSON, (user) => { return { id, permissions } });

  await usersDB.put((id, data) => Object.assign(data, { username }))
}

async function getNewUserPermissions(newUser) {
  const permissions = [];

  await getAllPermissions();

  permissionsAvailable.foreach(permission => {
    if (newUser[permission.camelCase] === "on")
      permissions.push(permission.permission);
  });

  return permissions;
}

async function updateUsersJSON(jsonfile, whatToDo) {
  await jsonfile.update(({ users }) => {
    const index = users.findIndex((user) => user.id === id);

    users[index] = whatToDo(users[index])

    return { users }
  })
}

async function createNewUser(newUser) {
  const { firstName, lastName, username, sessionTimeOut } = newUser;

  const jsonUser = { firstName, lastName, sessionTimeOut };
  const permissions = await getNewUserPermissions(newUser)


  const id = await usersDB.post({ username, password: "NONE" })

  await createJSONUser(usersJSON, {
    id,
    firstName,
    lastName,
    sessionTimeOut,
    creationDate: new Date().toJSON().slice(0, 10),
    role: "user"
  })

  await createJSONUser(permissionsJSON, { id, permissions })
}

async function createJSONUser(jsonfile, user) {
  await jsonfile.update(({ users }) => {
    users.push(user)

    return { users }
  })
}

async function getAllPermissions() {
  if (!permissionsAvailable)
    permissionsAvailable = (await permissionsAvailableJSON.get()).permissions;
  return;
}



// nothing works without it
function formatDBUser(dbUser) {
  const userFromDB = dbUser._doc;
  userFromDB.id = userFromDB._id.toString();
  delete userFromDB._id;

  return userFromDB;
} // although there must be better way using native mongoose.

module.exports = { getUser, getAllUsers, getPermissions };
