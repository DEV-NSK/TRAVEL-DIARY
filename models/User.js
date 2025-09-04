const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: "" },
  location: { type: String, default: "" },
  bio: { type: String, default: "" },
  role: { type: String, enum: ["user", "admin"], default: "user" } // ← new
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
