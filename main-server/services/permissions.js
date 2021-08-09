const permissionsAvailable = [
  { camelCase: "viewSubscriptions", permission: "View Subscriptions" },
  {
    camelCase: "createSubscriptions",
    permission: "Create Subscriptions",
  },
  {
    camelCase: "updateSubscriptions",
    permission: "Update Subscriptions",
  },
  {
    camelCase: "deleteSubscriptions",
    permission: "Delete Subscriptions",
  },
  { camelCase: "viewMovies", permission: "View Movies" },
  { camelCase: "createMovies", permission: "Create Movies" },
  { camelCase: "updateMovies", permission: "Update Movies" },
  { camelCase: "deleteMovies", permission: "Delete Movies" },
];

const getPermissions = ({ permissions: userPermissions }) =>
  permissionsAvailable.map((permission) => {
    return {
      ...permission,
      on: userPermissions.includes(permission.permission),
    };
  });

function getNewUserPermissions(newUser) {
  const permissions = [];

  permissionsAvailable.forEach((permission) => {
    if (newUser[permission.camelCase] === "on")
      permissions.push(permission.permission);
  });

  return permissions;
}

module.exports = { get: getPermissions, newUser: getNewUserPermissions };
