const express = require("express");
const routes = require("./routes/todo");
require("dotenv").config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", routes);

app.get("/", (req, res) => {
  res.end("Server is Working fine");
});

app.listen(port, () => {
  console.log(`App is Listening on PORT: ${port}`);
});
