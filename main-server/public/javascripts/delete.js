async function deleteThing(id, thing) {
  if (confirm(`Are you sure you want to delete this ${thing}?`)) {
    const { ok, error } = await fetch(`/${thing}s/${id}`, {
      method: "DELETE",
    });

    if (ok) {
      location.reload();
    } else
      alert(
        `Couldn't delete this ${thing}.
        Error: ${error.message}`
      );
  }
}
