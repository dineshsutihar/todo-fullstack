const express = require("express");

const route = express.Router();

route.get("/", (req, res) => {
  return res.status(200).json({
    msg: "Got all the todos",
  });
});

route.post("/create", (req, res) => {
  return res.status(201).json({
    msg: "sucessfully created",
  });
});

route.put("/:id", (req, res) => {
  const id = req.params.id;
  return res.json({
    msg: `sucessfully modifies ${id}`,
  });
});

route.delete("/:id", (req, res) => {
  const id = req.params.id;
  return res.json({
    msg: `sucessfully deleted ${id}`,
  });
});

module.exports = route;
