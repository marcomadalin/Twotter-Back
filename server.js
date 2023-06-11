require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const twittRoutes = require("./routes/twittRoutes");
const userRoutes = require("./routes/userRoutes");

//app
const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/twitts", twittRoutes);
app.use("/users", userRoutes);

//mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    //port
    app.listen(process.env.PORT, () => {
      console.log("connected, listening on port: " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });