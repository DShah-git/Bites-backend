const mongoose = require("mongoose");

const Professor = mongoose.model("Professor",
  new mongoose.Schema({
    name: String,
    email:String,
    password:String,
  })
);

module.exports = Professor;