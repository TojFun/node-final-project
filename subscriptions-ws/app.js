const express = require("express");

const membersRoute = require("./routes/members");
const moviesRoute = require("./routes/movies");
const subscriptionsRoute = require("./routes/subscriptions");

const setup = require("./services/setup");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// !! Uncomment me !!
// Setting up the DB:
// setup();

require("./configs/dataBase");

app.use("/members", membersRoute);
app.use("/movies", moviesRoute);
app.use("/subscriptions", subscriptionsRoute);

app.listen(8000);
