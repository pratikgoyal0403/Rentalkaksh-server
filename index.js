const path = require("path");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8080;
const appRoute = require("./Routes/appRoutes");
const adminRoute = require("./Routes/adminRoute");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
  multer({ storage: diskStorage, fileFilter: fileFilter }).single("image")
);
app.use(appRoute);
app.use(adminRoute);

mongoose.connect(
  process.env.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    app.listen(PORT, () => {
      console.log("server is up and running at port 8080");
    });
  }
);
