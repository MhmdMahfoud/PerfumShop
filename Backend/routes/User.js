const express = require("express");
const User = require("../models/UserSchema");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//register new user
router.post("/register", async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  if (!name || !email || !password || !phone || !address) {
    return res.status(400).json({ message: "All Fields are required" });
  }
  let hashedpassword = await bcrypt.hash(password, 10);
  const findemail = await User.findOne({ email });
  if (findemail) {
    return res.status(400).json({ message: "email alerady registerd" });
  }
  const newUser = new User({
    name,
    email,
    password: hashedpassword,
    phone,
    address,
  });
  await newUser.save();
  let token = jwt.sign(
    { email, id: newUser._id, role: newUser.role },
    process.env.SECRET,
    {
      expiresIn: "1w",
    }
  );
  return res.status(201).json({ message: "User added Successfuly", newUser, token });
});
//sign in
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "email and password are  required" });
  }
  const newUser = await User.findOne({ email });
  if (!newUser) {
    return res.status(400).json({ message: "User Not Found" });
  }
  const match = await bcrypt.compare(password, newUser.password);
  if (!match) {
    return res.status(400).json({ message: "Password not corect" });
  }
  let token = jwt.sign({ email, id: newUser._id }, process.env.SECRET, {
    expiresIn: "1w",
  });
  const user = await User.find();
  return res
    .status(201)
    .json({ message: "User sign in sucessfully", newUser, token});
});
//update user
router.put("/updateUser/:id", async (req, res) => {
  const userId = req.params.id;
  const { name, email, password, phone, address } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const newUser = await User.findByIdAndUpdate(
    userId,
    {
      name,
      email,
      password,
      phone,
      address,
    },
    { new: true }
  );
  await newUser.save();
  return res.status(201).json({ message: "user update  ", newUser });
});
module.exports = router;
