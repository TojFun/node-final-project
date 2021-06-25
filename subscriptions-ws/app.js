const express = require("express");
const app = express();

const membersRoute = require("./routes/members");
const moviesRoute = require("./routes/movies");
const subscriptionsRoute = require("./routes/subscriptions");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("./configs/dataBase");

app.use("/members", membersRoute);
app.use("/movies", moviesRoute);
app.use("/subscriptions", subscriptionsRoute);

app.listen(8000);
