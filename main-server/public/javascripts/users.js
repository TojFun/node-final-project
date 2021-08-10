const allPermissions = Array.from(
  document.querySelectorAll(".permission > input")
);

function changeView(permission) {
  const currentIndex = parseInt(permission.id.slice(11));
  const index = currentIndex < 4 ? 0 : 4;

  const viewPermission = allPermissions[index];

  if (currentIndex === index)
    return viewPermissionChange(viewPermission, index);

  if (viewPermission.checked === permission.checked) return;
  notViewPermissionChange(viewPermission, index);
}

function viewPermissionChange(viewPermission, index) {
  if (viewPermission.checked) return;

  for (let i = index + 1; i <= index + 3; i++) {
    allPermissions[i].checked = false;
  }
}

function notViewPermissionChange(viewPermission, index) {
  for (let i = index + 1; i <= index + 3; i++) {
    if (allPermissions[i].checked) {
      viewPermission.checked = true;
      return;
    }
  }

  viewPermission.checked = false;
}

const sessionTimeOut = document.querySelector("#sessionTimeOut");

function infinityClick({ checked }) {
  if (checked) {
    sessionTimeOut.setAttribute("disabled", "");
    sessionTimeOut.setAttribute("type", "text");
    sessionTimeOut.setAttribute("value", "Infinity");
  } else {
    sessionTimeOut.removeAttribute("disabled");
    sessionTimeOut.setAttribute("type", "number");
    sessionTimeOut.setAttribute("value", "");
  }
}
