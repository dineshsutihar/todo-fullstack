const Todo = require("../model/todo");
const saveTodo = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTodo = new Todo({ title, description });
    await newTodo.save();
    const allTodo = await Todo.find();

    return res
      .status(201)
      .json({ message: "Todo Created Sucessfully", todos: allTodo });
  } catch (error) {
    return res.status(500).json({
      message: "Something went Wrong",
      error: error.message,
    });
  }
};

const getTodo = async (req, res) => {
  try {
    const allTodo = await Todo.find();
    return res.status(201).json({
      message: "Fetching Success...",
      todos: allTodo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Issue while fetching the data..",
      error: error.message,
    });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const _id = req.params.id;
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id },
      { status },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: status ? "Marked Completed" : "Task Pending",
      updatedTodo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error Encountered",
      error: error.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  const _id = req.params.id;
  try {
    const delTodo = await Todo.findOneAndDelete({ _id });
    const todos = await Todo.find({});

    if (!delTodo) {
      return res.status(404).json({
        message: "Task doesn't Exists....",
      });
    }
    return res.status(200).json({
      message: "Delete Sucessfull",
      todos,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Encountered Issue Deleting todo..",
      error: error.message,
    });
  }
};

module.exports = {
  saveTodo,
  getTodo,
  changeStatus,
  deleteTodo,
};
