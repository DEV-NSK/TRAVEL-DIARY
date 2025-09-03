// // const express = require("express");
// // const dotenv = require("dotenv");
// // const mongoose = require("mongoose");
// // const cors = require("cors");
// // const morgan = require("morgan");

// // const errorHandler = require("./middleware/errorHandler");
// // const userRoutes = require("./routes/userRoutes");
// // const adminRoutes = require("./routes/adminRoutes");

// // dotenv.config();
// // const app = express();

// // app.use(express.json());
// // app.use(cors());
// // app.use(morgan("dev"));
// // app.use(errorHandler);

// // app.use("/api/auth", require("./routes/authRoutes"));
// // app.use("/api/admin", adminRoutes);
// // app.use("/api/users", userRoutes);
// // app.use("/api/diary", require("./routes/diaryRoutes"));
// // app.use("/api/comment", require("./routes/commentRoutes"));

// // app.get("/", (req, res) => res.send("Travel Diary API is running..."));

// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => {
// //     app.listen(process.env.PORT, () => {
// //       console.log(`Server running on port ${process.env.PORT}`);
// //     });
// //   })
// //   .catch(err => console.log(err));

// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const morgan = require("morgan");

// const errorHandler = require("./middleware/errorHandler");
// const userRoutes = require("./routes/userRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB(); 

// const app = express();

// app.use(express.json());
// app.use("/uploads", express.static("uploads"));
// app.use(cors());
// app.use(morgan("dev"));

// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/users", userRoutes);
// app.use("/api/diary", require("./routes/diaryRoutes"));
// app.use("/api/comment", require("./routes/commentRoutes"));
// app.use("/api/admin", adminRoutes);

// app.get("/", (req, res) => res.send("Travel Diary API is running..."));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const connectDB = require("./config/db");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(express.json({ limit: "10mb" })); // handles large json payloads
app.use(express.urlencoded({ extended: true })); // handles form data
app.use(cors());
app.use(morgan("dev"));

// Serve static files for uploads
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", userRoutes);
app.use("/api/diary", require("./routes/diaryRoutes"));
app.use("/api/comment", require("./routes/commentRoutes"));
app.use("/api/admin", adminRoutes);

// Root route
app.get("/", (req, res) => res.send("Travel Diary API is running..."));

// Error Handler (after routes)
app.use(errorHandler);

// Global error catcher (to prevent server crash)
app.use((err, req, res, next) => {
  console.error("Global Error:", err.stack || err);
  res.status(500).json({ success: false, message: "Server Error", error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
