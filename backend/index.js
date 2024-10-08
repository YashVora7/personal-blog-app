const express = require("express");
const cors = require("cors");
const connect = require("./config/db");
const blogRouter = require("./routes/blog.route");
const userRouter = require("./routes/user.route");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;

app.use("/blog", blogRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connect();
});
