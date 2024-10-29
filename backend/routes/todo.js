const express = require("express");
const {
  saveTodo,
  getTodo,
  changeStatus,
  deleteTodo,
  updateTodo,
} = require("../controllers/todo");

const route = express.Router();

route.get("/", getTodo);
route.post("/create", saveTodo);

route.put("/:id", changeStatus);

route.put("/update/:id", updateTodo);

route.delete("/:id", deleteTodo);

module.exports = route;
