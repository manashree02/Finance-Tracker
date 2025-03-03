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

app.post("/entries", async (req, res) => {
  console.log("req.body", req.body);
  const { userId, description, amount, type, paymentMethod, date } = req.body;

  if (!userId || !description || !amount || !type || !paymentMethod || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const entry = await EntryModel.create({
      userId,
      description,
      amount: Number(amount),
      type,
      paymentMethod,
      date,
    });
    res.json(entry);
  } catch (err) {
    console.error("Database error:", err); 
    res.status(500).json({ error: err.message });
  }
});

app.get("/entries", (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  EntryModel.find({ userId })
    .then((entries) => res.json(entries))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// app.get("/enteries",(req,res)=>{
//   EntryModel
// })

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
