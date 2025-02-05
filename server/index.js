const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/users");
const EntryModel = require("./models/entries");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/FinanceTracker")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.post("/signup", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({ error: err.message }));
});
app.post("/entries", (req, res) => {
  console.log(req.body);

  EntryModel.create(req.body)
    .then((entry) => res.json(entry))
    .catch((err) => res.status(500).json({ error: err.message }));
});
app.get("/entries", (req, res) => {
  console.log(req.body);
  EntryModel.find()
    .then((entries) => res.json(entries))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.post("/", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "User not found!" });
      }
      if (password !== user.password) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      res.json({ message: "Login Successfull" });
    })
    .catch((err) => res.json({ error: "Database error" }));
});

app.listen(3001, () => {
  console.log("server is runningnon http://localhost:3001");
});
