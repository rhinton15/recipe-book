const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.gohlp.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`;

const app = express();

const mainRoutes = require("./routes/main");
const authRoutes = require("./routes/auth");

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));

// CORS stuff
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(mainRoutes);
app.use(authRoutes);

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({ message: error.message });
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(process.env.PORT || 3000);
    console.log("CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });
