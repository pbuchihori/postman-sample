const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const users = [
  { id: "1", name: "a" },
  { id: "2", name: "b" },
  { id: "3", name: "c" },
];

app
  .use(bodyParser.json())
  .get("/user", (req, res) => {
    res.status(200).json({
      users,
    });
  })
  .get("/user/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((e) => e.id === id);
    if (user) {
      res.status(200).json({
        user,
      });
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  })
  .post("/user", (req, res) => {
    const { body } = req;
    if (typeof body?.name === "string") {
      res.status(201).json({ createdAt: new Date().getTime() });
    } else {
      res.status(400).json({ error: "Bad Request" });
    }
  })
  .put("/user/:id", (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const user = users.find((e) => e.id === id);
    if (user) {
      if (typeof body?.name === "string") {
        res.status(204).json({ updatedAt: new Date().getTime() });
      } else {
        res.status(400).json({ error: "Bad Request" });
      }
    } else {
      res.status(400).json({ error: "Bad Request" });
    }
  })
  .delete("/user/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((e) => e.id === id);
    if (user) {
      res.status(204).json({ updatedAt: new Date().getTime() });
    } else {
      res.status(400).json({ error: "Bad Request" });
    }
  });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
