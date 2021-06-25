const express = require("express");
const app = express();

const testRoute = require("./routes/test");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("./configs/dataBase");

app.use("/test", testRoute);

app.listen(8000);
