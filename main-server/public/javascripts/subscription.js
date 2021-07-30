function subscriptionsButtonClick(id) {
  const panel = document.querySelector(`#subscriptionPanel${id}`);

  if (panel.classList.contains("hide")) panel.classList.remove("hide");
  else panel.classList.add("hide");
}

async function subscribe(subscriptionID, memberID) {
  const { value: movieID } = document.querySelector(`.id${memberID} .movie`);
  const { value: watchDate } = document.querySelector(
    `.id${memberID} .watchDate`
  );

  const { ok, error } = await (
    await fetch("/subscriptions/" + subscriptionID, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieID, watchDate }),
    })
  ).json();

  if (ok) {
    confirm("You've successfully subscribed for this movie.");
    location.reload();
  } else {
    alert("Error: " + error.message);
  }
}
