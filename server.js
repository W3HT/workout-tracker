const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const routes = require('./controllers');

const db = require("./models");
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


const opts = {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false}  
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", opts) 

app.use(routes)

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });