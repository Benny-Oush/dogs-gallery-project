const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const galleryRouter = require("./routes/gallery.js");

const mongoURL = "mongodb://localhost:27017/gallery";
mongoose.connect(mongoURL);

const app = express();

app.use(cors())
app.use(express.json());

app.use("/gallery", galleryRouter);

app.get("/ping", (req, res) => res.send("pong"));

app.listen(3000, () => console.log("Listening on port 3000"));