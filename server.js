const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, default: "user" }
});

const BookingSchema = new mongoose.Schema({
  userId: String,
  hotel: String,
  roomType: String,
  price: Number,
  date: Date
});

const User = mongoose.model("User", UserSchema);
const Booking = mongoose.model("Booking", BookingSchema);

// Register
app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, role });
  await user.save();
  res.json({ message: "User Registered" });
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: "User not found" });
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid Credentials" });
  
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token, role: user.role });
});

// Book Room
app.post("/book", async (req, res) => {
  const { userId, hotel, roomType, price, date } = req.body;
  const booking = new Booking({ userId, hotel, roomType, price, date });
  await booking.save();
  res.json({ message: "Room Booked Successfully" });
});

// Admin Panel - Get All Bookings
app.get("/admin/bookings", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

app.listen(5000, () => console.log("Server running on port 5000"));
