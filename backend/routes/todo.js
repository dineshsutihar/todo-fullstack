const express = require("express");
const {
  saveTodo,
  getTodo,
  changeStatus,
  deleteTodo,
} = require("../controllers/todo");

const route = express.Router();

route.get("/", getTodo);
route.post("/create", saveTodo);

route.put("/:id", changeStatus);

route.delete("/:id", deleteTodo);

module.exports = route;
