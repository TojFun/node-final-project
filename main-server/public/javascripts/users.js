async function deleteUser(id) {
  if (confirm(`Are you sure you want to delete ${id}?`)) {
    const { ok, error } = await fetch(`/users/${id}`, {
      method: "DELETE",
    });

    if (ok) {
      location.reload();
      alert(`${id} was deleted.`);
    } else
      alert(
        `Couldn't delete ${id}.
        Error: ${error.message}`
      );
  }
}
