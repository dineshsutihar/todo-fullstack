const express = require("express");
const routes = require("./routes/todo");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT;
const app = express();
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected Sucessfully"))
  .catch(() => console.log("Error Connecting to DB"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", routes);

app.get("/", (req, res) => {
  res.end("Server is Working fine");
});

app.listen(port, () => {
  console.log(`App is Listening on PORT: ${port}`);
});
