const express = require("express");

const iphones = require("./iphone-list.json");

const app = express();

app.use(express.static("images"));

app.get("/:id", (req, res) => {
  setTimeout(() => {
    res.json(iphones.find((iphone) => iphone.Identifier === req.params.id));
  }, 50);
});

app.get("/", (req, res) => {
  setTimeout(() => {
    res.json(iphones.map((iphone) => iphone.Identifier));
  }, 50);
});

app.listen(8080, () => {
  console.log("Listening on http://localhost:8080");
});
