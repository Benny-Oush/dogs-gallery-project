const express = require("express");
const {
  loginOrCreateUser,
  changeProfilePicture,
  deleteUser,
  getAllUsers,
  getUserFavoritePictures,
  addFavoritePicture,
} = require("../controllers/gallery.js");

const router = new express.Router();

router.get("/favorites/:username", async (req, res) => {
  try {
    const result = await getUserFavoritePictures(req.params.username);
    res.status(200).json({ success: true, favorites: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.toString() });
  }
});

router.post("/favorites", async (req, res) => {
  try {
    const { username, image_url } = req.body;
    const result = await addFavoritePicture(username, image_url);
    res.status(201).json({ success: true, favorite: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.toString() });
  }
});

router.get("/users", async (req, res) => {
  try {
    const result = await getAllUsers();
    res.status(200).json({ success: true, users: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.toString() });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, profile_picture } = req.body;
    const result = await loginOrCreateUser(username, profile_picture);
    res.status(200).json({ success: true, result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.toString() });
  }
});

router.patch("/profile", async (req, es) => {
  try {
    const { username, profile_picture } = req.body;
    const result = await changeProfilePicture(username, profile_picture);
    if (!result) {
      res.status(404).json({ success: false, error: "User not found" });
    } else {
      res.status(200).json({ success: true, result });
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err.toString() });
  }
});

router.delete("/user/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const result = await deleteUser(username);
    if (!result) {
      res.status(404).json({ success: false, error: "User not found" });
    } else {
      res.status(200).json({ success: true, result });
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err.toString() });
  }
});

module.exports = router;
