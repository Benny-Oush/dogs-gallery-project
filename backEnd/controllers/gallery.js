const User = require("../models/users.js");
const Favorite = require("../models/favorites.js");

async function loginOrCreateUser(username, profile_picture = null) {
  const userData = {};
  if (profile_picture) {
    userData.profile_picture = profile_picture;
  }
  const user = await User.findOneAndUpdate(
    { username },
    { $setOnInsert: userData },
    {
      upsert: true,
      returnDocument: "after",
      runValidators: true,
      setDefaultsOnInsert: true,
    },
  );
  return user;
}

async function changeProfilePicture(username, profile_picture) {
  const user = await User.findOneAndUpdate(
    { username },
    { profile_picture },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
  return user;
}

async function deleteUser(username) {
  const user = await User.findOneAndDelete({ username });
  if (user) {
    await Favorite.deleteMany({ username });
  }
  return user;
}

async function getAllUsers() {
  const users = await User.find();
  return users;
}

async function getUserFavoritePictures(username) {
  const urls = await Favorite.find({ username }, "image_url");
  return urls;
}

async function addFavoritePicture(username, image_url) {
  const favorite = new Favorite({ username, image_url });
  await favorite.save();
  return favorite;
}

module.exports = {
  loginOrCreateUser,
  changeProfilePicture,
  deleteUser,
  getAllUsers,
  getUserFavoritePictures,
  addFavoritePicture,
};
