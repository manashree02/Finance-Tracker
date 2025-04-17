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
  console.log(req.body);
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

app.get("/entries", async(req, res) => {
  console.log("req.query", req.query);
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  EntryModel.find({ userId })
    .then((entries) => res.json(entries))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.get("/detail", async(req, res) => {
  console.log("req.query", req.query);
  const { entryId } = req.query;
  if (!entryId) {
    return res.status(400).json({ error: "Expense Entry not found!" });
  }
  try {
    const entry = await EntryModel.findById(entryId);
    if (!entry) {
      return res.status(404).json({ error: "No entry found!" });
    }
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/detail/:entryId",async(req,res)=>{
  try{
    const {entryId}=req.params;
    const updatedData=req.body;
    const result=await EntryModel.findByIdAndUpdate(entryId,updatedData,{new:true});
    if(!result){
      return res.status(404).json({message:"No entry found!"})
    }
    res.json({message:"Updated successfully!",data:result});
  }
  catch(err){
    res.status(500).json({error:"Database error"})
  }
});

app.get("/user/:id", async(req,res)=>{
  try{
    const user=await UserModel.findById(req.params.id);
    if(!user){
      return res.status(404).json({error:"User not found"})
    }
    res.json({username:user.email})
  }
    catch(err){
      res.status(500).json({ error: err.message });
    }
  });


;

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
      res.json({ message: "Login Successfull",
        userId:user._id
       });
    })
    .catch((err) => res.json({ error: "Database error" }));
});

app.listen(3001, () => {
  console.log("server is running on http://localhost:3001");
});
