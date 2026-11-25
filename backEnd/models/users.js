const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    unique: true,
    required: [true, "username required"],
  },
  profile_picture: {
    type: String,
  },
});

const model = mongoose.model("users", schema);

module.exports = model;
