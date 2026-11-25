const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username required"],
    validate: {
      validator: async function (value) {
        const user = await mongoose.model("users").findOne({username: value});
        return Boolean(user);
      },
      message: "User does not exits",
    },
  },
  image_url: {
    type: String,
    required: [true, "image_url required"],
  },
});

schema.index({username: 1, image_url: 1}, {unique: true})

const model = mongoose.model("favorites", schema);

module.exports = model;
