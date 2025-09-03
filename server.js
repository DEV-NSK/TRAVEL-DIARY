// const express = require("express");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const morgan = require("morgan");

// const errorHandler = require("./middleware/errorHandler");
// const userRoutes = require("./routes/userRoutes");
// const adminRoutes = require("./routes/adminRoutes");

// dotenv.config();
// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use(morgan("dev"));
// app.use(errorHandler);

// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/admin", adminRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/diary", require("./routes/diaryRoutes"));
// app.use("/api/comment", require("./routes/commentRoutes"));

// app.get("/", (req, res) => res.send("Travel Diary API is running..."));

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(process.env.PORT, () => {
//       console.log(`Server running on port ${process.env.PORT}`);
//     });
//   })
//   .catch(err => console.log(err));

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const connectDB = require("./config/db");

dotenv.config();
connectDB(); 

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(morgan("dev"));
app.use(errorHandler);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", userRoutes);
app.use("/api/diary", require("./routes/diaryRoutes"));
app.use("/api/comment", require("./routes/commentRoutes"));
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => res.send("Travel Diary API is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
