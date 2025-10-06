require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index.pug");
});

app.listen(port, () => {
  console.log(`vigrei.dev running on port ${port}`);
});
