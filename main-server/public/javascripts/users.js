async function deleteUser(id) {
  if (confirm(`Are you sure you want to delete ${id}?`)) {
    const wasDeleted = await fetch(`/users/${id}`, {
      method: "DELETE",
    });

    if (wasDeleted) {
      location.reload();
      alert(`${id} was deleted.`);
    } else alert(`Couldn't delete ${id}.`);
  }
}
