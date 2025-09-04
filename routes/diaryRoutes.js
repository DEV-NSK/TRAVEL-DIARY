// // // // // // // const express = require("express");
// // // // // // // const router = express.Router();
// // // // // // // const auth = require("../middleware/authMiddleware");
// // // // // // // const DiaryEntry = require("../models/DiaryEntry");
// // // // // // // const multer = require("multer");
// // // // // // // const path = require("path");

// // // // // // // // ------------------ MULTER CONFIG for media upload ------------------
// // // // // // // const storage = multer.diskStorage({
// // // // // // //   destination: (req, file, cb) => {
// // // // // // //     cb(null, "uploads/"); // folder to save files
// // // // // // //   },
// // // // // // //   filename: (req, file, cb) => {
// // // // // // //     cb(null, Date.now() + path.extname(file.originalname));
// // // // // // //   },
// // // // // // // });
// // // // // // // const upload = multer({ storage });

// // // // // // // // ------------------ CREATE a diary post ------------------
// // // // // // // router.post("/", auth, upload.array("media", 5), async (req, res) => {
// // // // // // //   try {
// // // // // // //     const { title, description, location, coordinates } = req.body;
// // // // // // //     const media = req.files ? req.files.map((file) => file.filename) : [];

// // // // // // //     const diaryEntry = new DiaryEntry({
// // // // // // //       user: req.user.id,
// // // // // // //       title,
// // // // // // //       description,
// // // // // // //       location,
// // // // // // //       media,
// // // // // // //     });

// // // // // // //     await diaryEntry.save();
// // // // // // //     res.status(201).json({ msg: "Diary created successfully", diaryEntry });
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // // // // //   }
// // // // // // // });

// // // // // // // // ------------------ GET all diary posts ------------------
// // // // // // // router.get("/", async (req, res) => {
// // // // // // //   try {
// // // // // // //     const posts = await DiaryEntry.find()
// // // // // // //       .populate("user", "name email profilePic")
// // // // // // //       .populate("comments")
// // // // // // //       .sort({ createdAt: -1 });
// // // // // // //     res.json(posts);
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // // // // //   }
// // // // // // // });

// // // // // // // // ------------------ GET single diary post ------------------
// // // // // // // router.get("/:id", auth, async (req, res) => {
// // // // // // //   try {
// // // // // // //     const post = await DiaryEntry.findById(req.params.id)
// // // // // // //       .populate("user", "name email profilePic")
// // // // // // //       .populate("comments");

// // // // // // //     if (!post) return res.status(404).json({ msg: "Post not found" });
// // // // // // //     res.json(post);
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // // // // //   }
// // // // // // // });

// // // // // // // // ------------------ UPDATE diary post ------------------
// // // // // // // router.put("/:id", auth, async (req, res) => {
// // // // // // //   try {
// // // // // // //     const { title, description, location, media, coordinates } = req.body;

// // // // // // //     const post = await DiaryEntry.findById(req.params.id);
// // // // // // //     if (!post) return res.status(404).json({ msg: "Post not found" });

// // // // // // //     if (post.user.toString() !== req.user.id)
// // // // // // //       return res.status(403).json({ msg: "Not authorized" });

// // // // // // //     post.title = title || post.title;
// // // // // // //     post.description = description || post.description;
// // // // // // //     post.location = location || post.location;
// // // // // // //     post.media = media || post.media;
// // // // // // //     post.coordinates = coordinates ? JSON.parse(coordinates) : post.coordinates;

// // // // // // //     await post.save();
// // // // // // //     res.json({ msg: "Post updated successfully", post });
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // // // // //   }
// // // // // // // });

// // // // // // // // ------------------ DELETE diary post ------------------
// // // // // // // router.delete("/:id", auth, async (req, res) => {
// // // // // // //   try {
// // // // // // //     const post = await DiaryEntry.findById(req.params.id);
// // // // // // //     if (!post) return res.status(404).json({ msg: "Post not found" });

// // // // // // //     if (req.user.role !== "admin")
// // // // // // //       return res.status(403).json({ msg: "Access denied: Admin only can delete posts" });

// // // // // // //     await post.deleteOne();
// // // // // // //     res.json({ msg: "Post deleted successfully by admin" });
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // // // // //   }
// // // // // // // });

// // // // // // // // ------------------ LIKE / UNLIKE a post ------------------
// // // // // // // router.put("/like/:id", auth, async (req, res) => {
// // // // // // //   try {
// // // // // // //     const post = await DiaryEntry.findById(req.params.id);
// // // // // // //     if (!post) return res.status(404).json({ msg: "Post not found" });

// // // // // // //     const userId = req.user.id;
// // // // // // //     if (post.likes.includes(userId)) {
// // // // // // //       post.likes = post.likes.filter((id) => id.toString() !== userId); // unlike
// // // // // // //     } else {
// // // // // // //       post.likes.push(userId); // like
// // // // // // //     }

// // // // // // //     await post.save();
// // // // // // //     res.json({
// // // // // // //       msg: post.likes.includes(userId) ? "Post liked" : "Post unliked",
// // // // // // //       likesCount: post.likes.length,
// // // // // // //       likes: post.likes
// // // // // // //     });
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // // // // //   }
// // // // // // // });

// // // // // // // // ------------------ GET diary posts by location ------------------
// // // // // // // router.get("/location/:place", async (req, res) => {
// // // // // // //   try {
// // // // // // //     const posts = await DiaryEntry.find({ location: req.params.place })
// // // // // // //       .populate("user", "name profilePic")
// // // // // // //       .populate("comments")
// // // // // // //       .sort({ createdAt: -1 });

// // // // // // //     res.json({ posts });
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // // // // //   }
// // // // // // // });

// // // // // // // module.exports = router;





// // // // // // const express = require("express");
// // // // // // const router = express.Router();
// // // // // // const auth = require("../middleware/authMiddleware");
// // // // // // const DiaryEntry = require("../models/DiaryEntry");
// // // // // // const multer = require("multer");
// // // // // // const path = require("path");

// // // // // // // ------------------ MULTER CONFIG for media upload ------------------
// // // // // // const storage = multer.diskStorage({
// // // // // //   destination: (req, file, cb) => {
// // // // // //     cb(null, "uploads/"); // folder to save files
// // // // // //   },
// // // // // //   filename: (req, file, cb) => {
// // // // // //     cb(null, Date.now() + path.extname(file.originalname));
// // // // // //   },
// // // // // // });
// // // // // // const upload = multer({ storage });

// // // // // // // ------------------ CREATE a diary post ------------------
// // // // // // router.post("/", auth, upload.array("media", 5), async (req, res) => {
// // // // // //   try {
// // // // // //     const { title, description, location } = req.body;
// // // // // //     const media = req.files ? req.files.map((file) => file.path) : []; // ✅ use path

// // // // // //     const diaryEntry = new DiaryEntry({
// // // // // //       user: req.user.id,
// // // // // //       title,
// // // // // //       description,
// // // // // //       location,
// // // // // //       media,
// // // // // //     });

// // // // // //     await diaryEntry.save();
// // // // // //     res.status(201).json({ msg: "Diary created successfully", diaryEntry });
// // // // // //   } catch (err) {
// // // // // //     console.error("Error saving diary:", err);
// // // // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // // // //   }
// // // // // // });

// // // // // // // ------------------ GET all diary posts ------------------
// // // // // // router.get("/", async (req, res) => {
// // // // // //   try {
// // // // // //     const posts = await DiaryEntry.find()
// // // // // //       .populate("user", "name email profilePic")
// // // // // //       .populate("comments")
// // // // // //       .sort({ createdAt: -1 });
// // // // // //     res.json(posts);
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // // // //   }
// // // // // // });

// // // // // // // ------------------ GET single diary post ------------------
// // // // // // router.get("/:id", auth, async (req, res) => {
// // // // // //   try {
// // // // // //     const post = await DiaryEntry.findById(req.params.id)
// // // // // //       .populate("user", "name email profilePic")
// // // // // //       .populate("comments");

// // // // // //     if (!post) return res.status(404).json({ msg: "Post not found" });
// // // // // //     res.json(post);
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // // // //   }
// // // // // // });

// // // // // // // ------------------ UPDATE diary post ------------------
// // // // // // router.put("/:id", auth, async (req, res) => {
// // // // // //   try {
// // // // // //     const { title, description, location, media, coordinates } = req.body;

// // // // // //     const post = await DiaryEntry.findById(req.params.id);
// // // // // //     if (!post) return res.status(404).json({ msg: "Post not found" });

// // // // // //     if (post.user.toString() !== req.user.id)
// // // // // //       return res.status(403).json({ msg: "Not authorized" });

// // // // // //     post.title = title || post.title;
// // // // // //     post.description = description || post.description;
// // // // // //     post.location = location || post.location;
// // // // // //     post.media = media || post.media;
// // // // // //     post.coordinates = coordinates ? JSON.parse(coordinates) : post.coordinates;

// // // // // //     await post.save();
// // // // // //     res.json({ msg: "Post updated successfully", post });
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // // // //   }
// // // // // // });

// // // // // // // ------------------ DELETE diary post ------------------
// // // // // // router.delete("/:id", auth, async (req, res) => {
// // // // // //   try {
// // // // // //     const post = await DiaryEntry.findById(req.params.id);
// // // // // //     if (!post) return res.status(404).json({ msg: "Post not found" });

// // // // // //     if (req.user.role !== "admin")
// // // // // //       return res.status(403).json({ msg: "Access denied: Admin only can delete posts" });

// // // // // //     await post.deleteOne();
// // // // // //     res.json({ msg: "Post deleted successfully by admin" });
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // // // //   }
// // // // // // });

// // // // // // // ------------------ LIKE / UNLIKE a post ------------------
// // // // // // router.put("/like/:id", auth, async (req, res) => {
// // // // // //   try {
// // // // // //     const post = await DiaryEntry.findById(req.params.id);
// // // // // //     if (!post) return res.status(404).json({ msg: "Post not found" });

// // // // // //     const userId = req.user.id;
// // // // // //     if (post.likes.includes(userId)) {
// // // // // //       post.likes = post.likes.filter((id) => id.toString() !== userId); // unlike
// // // // // //     } else {
// // // // // //       post.likes.push(userId); // like
// // // // // //     }

// // // // // //     await post.save();
// // // // // //     res.json({
// // // // // //       msg: post.likes.includes(userId) ? "Post liked" : "Post unliked",
// // // // // //       likesCount: post.likes.length,
// // // // // //       likes: post.likes
// // // // // //     });
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // // // //   }
// // // // // // });

// // // // // // // ------------------ GET diary posts by location ------------------
// // // // // // router.get("/location/:place", async (req, res) => {
// // // // // //   try {
// // // // // //     const posts = await DiaryEntry.find({ location: req.params.place })
// // // // // //       .populate("user", "name profilePic")
// // // // // //       .populate("comments")
// // // // // //       .sort({ createdAt: -1 });

// // // // // //     res.json({ posts });
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // // // //   }
// // // // // // });

// // // // // // module.exports = router;



// // // // // const express = require("express");
// // // // // const router = express.Router();
// // // // // const auth = require("../middleware/authMiddleware");
// // // // // const DiaryEntry = require("../models/DiaryEntry");
// // // // // const multer = require("multer");
// // // // // const path = require("path");
// // // // // const fs = require("fs");

// // // // // // ------------------ Ensure uploads folder exists ------------------
// // // // // if (!fs.existsSync("uploads")) {
// // // // //   fs.mkdirSync("uploads");
// // // // // }

// // // // // // ------------------ MULTER CONFIG for media upload ------------------
// // // // // const storage = multer.diskStorage({
// // // // //   destination: (req, file, cb) => {
// // // // //     cb(null, "uploads/"); // folder to save files
// // // // //   },
// // // // //   filename: (req, file, cb) => {
// // // // //     cb(null, Date.now() + path.extname(file.originalname));
// // // // //   },
// // // // // });
// // // // // const upload = multer({ storage });

// // // // // // ------------------ CREATE a diary post ------------------
// // // // // router.post("/", auth, upload.array("media", 5), async (req, res) => {
// // // // //   try {
// // // // //     const { title, description, location } = req.body;
// // // // //     const media = req.files ? req.files.map((file) => file.filename) : [];

// // // // //     const diaryEntry = new DiaryEntry({
// // // // //       user: req.user.id,
// // // // //       title,
// // // // //       description,
// // // // //       location,
// // // // //       media,
// // // // //     });

// // // // //     await diaryEntry.save();
// // // // //     res.status(201).json({ msg: "Diary created successfully", diaryEntry });
// // // // //   } catch (err) {
// // // // //     console.error("Error saving diary:", err);
// // // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // // //   }
// // // // // });

// // // // // // ------------------ GET diary posts by location (keep ABOVE :id) ------------------
// // // // // router.get("/location/:place", async (req, res) => {
// // // // //   try {
// // // // //     const posts = await DiaryEntry.find({ location: req.params.place })
// // // // //       .populate("user", "name profilePic")
// // // // //       .populate("comments")
// // // // //       .sort({ createdAt: -1 });

// // // // //     res.json({ posts });
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // // //   }
// // // // // });

// // // // // // ------------------ GET all diary posts ------------------
// // // // // router.get("/", async (req, res) => {
// // // // //   try {
// // // // //     const posts = await DiaryEntry.find()
// // // // //       .populate("user", "name email profilePic")
// // // // //       .populate("comments")
// // // // //       .sort({ createdAt: -1 });
// // // // //     res.json(posts);
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // // //   }
// // // // // });

// // // // // // ------------------ GET diaries of logged-in user ------------------
// // // // // router.get("/my", auth, async (req, res) => {
// // // // //   try {
// // // // //     const diaries = await DiaryEntry.find({ user: req.user.id })
// // // // //       .populate("user", "name email profilePic")
// // // // //       .populate("comments")
// // // // //       .sort({ createdAt: -1 });

// // // // //     res.json(diaries);
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // // //   }
// // // // // });

// // // // // // ------------------ GET single diary post ------------------
// // // // // router.get("/:id", auth, async (req, res) => {
// // // // //   try {
// // // // //     const post = await DiaryEntry.findById(req.params.id)
// // // // //       .populate("user", "name email profilePic")
// // // // //       .populate("comments");

// // // // //     if (!post) return res.status(404).json({ msg: "Post not found" });
// // // // //     res.json(post);
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // // //   }
// // // // // });

// // // // // // ------------------ UPDATE diary post ------------------
// // // // // router.put("/:id", auth, async (req, res) => {
// // // // //   try {
// // // // //     const { title, description, location, media, coordinates } = req.body;

// // // // //     const post = await DiaryEntry.findById(req.params.id);
// // // // //     if (!post) return res.status(404).json({ msg: "Post not found" });

// // // // //     if (post.user.toString() !== req.user.id)
// // // // //       return res.status(403).json({ msg: "Not authorized" });

// // // // //     post.title = title || post.title;
// // // // //     post.description = description || post.description;
// // // // //     post.location = location || post.location;
// // // // //     post.media = media || post.media;
// // // // //     post.coordinates = coordinates ? JSON.parse(coordinates) : post.coordinates;

// // // // //     await post.save();
// // // // //     res.json({ msg: "Post updated successfully", post });
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // // //   }
// // // // // });

// // // // // // ------------------ DELETE diary post ------------------
// // // // // router.delete("/:id", auth, async (req, res) => {
// // // // //   try {
// // // // //     const post = await DiaryEntry.findById(req.params.id);
// // // // //     if (!post) return res.status(404).json({ msg: "Post not found" });

// // // // //     if (req.user.role !== "admin")
// // // // //       return res.status(403).json({ msg: "Access denied: Admin only can delete posts" });

// // // // //     await post.deleteOne();
// // // // //     res.json({ msg: "Post deleted successfully by admin" });
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // // //   }
// // // // // });

// // // // // // ------------------ LIKE / UNLIKE a post ------------------
// // // // // router.put("/like/:id", auth, async (req, res) => {
// // // // //   try {
// // // // //     const post = await DiaryEntry.findById(req.params.id);
// // // // //     if (!post) return res.status(404).json({ msg: "Post not found" });

// // // // //     const userId = req.user.id;
// // // // //     if (post.likes.includes(userId)) {
// // // // //       post.likes = post.likes.filter((id) => id.toString() !== userId); // unlike
// // // // //     } else {
// // // // //       post.likes.push(userId); // like
// // // // //     }

// // // // //     await post.save();
// // // // //     res.json({
// // // // //       msg: post.likes.includes(userId) ? "Post liked" : "Post unliked",
// // // // //       likesCount: post.likes.length,
// // // // //       likes: post.likes,
// // // // //     });
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // // //   }
// // // // // });

// // // // // module.exports = router;





// // // // const express = require("express");
// // // // const router = express.Router();
// // // // const auth = require("../middleware/authMiddleware");
// // // // const DiaryEntry = require("../models/DiaryEntry");
// // // // const multer = require("multer");
// // // // const path = require("path");
// // // // const fs = require("fs");

// // // // // ------------------ Ensure uploads folder exists ------------------
// // // // if (!fs.existsSync("uploads")) {
// // // //   fs.mkdirSync("uploads");
// // // // }

// // // // // ------------------ MULTER CONFIG for media upload ------------------
// // // // const storage = multer.diskStorage({
// // // //   destination: (req, file, cb) => {
// // // //     cb(null, "uploads/"); // folder to save files
// // // //   },
// // // //   filename: (req, file, cb) => {
// // // //     cb(null, Date.now() + path.extname(file.originalname));
// // // //   },
// // // // });
// // // // const upload = multer({ storage });

// // // // // ------------------ CREATE a diary post ------------------
// // // // router.post("/", auth, upload.array("media", 5), async (req, res) => {
// // // //   try {
// // // //     const { title, description, location } = req.body;
// // // //     const media = req.files ? req.files.map((file) => file.filename) : [];

// // // //     const diaryEntry = new DiaryEntry({
// // // //       user: req.user.id,
// // // //       title,
// // // //       description,
// // // //       location,
// // // //       media,
// // // //     });

// // // //     await diaryEntry.save();
// // // //     res.status(201).json({ msg: "Diary created successfully", diaryEntry });
// // // //   } catch (err) {
// // // //     console.error("Error saving diary:", err);
// // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // //   }
// // // // });

// // // // // ------------------ GET diaries of logged-in user ------------------
// // // // router.get("/user/:id", auth, async (req, res) => {
// // // //   try {
// // // //     const posts = await DiaryEntry.find({ user: req.user._id })
// // // //       .populate("user", "name email profilePic")
// // // //       .sort({ createdAt: -1 });

// // // //     res.json(posts);
// // // //   } catch (err) {
// // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // //   }
// // // // });

// // // // // ------------------ GET diary posts by location ------------------
// // // // router.get("/location/:place", async (req, res) => {
// // // //   try {
// // // //     const posts = await DiaryEntry.find({ location: req.params.place })
// // // //       .populate("user", "name profilePic")
// // // //       .populate("comments")
// // // //       .sort({ createdAt: -1 });

// // // //     res.json({ posts });
// // // //   } catch (err) {
// // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // //   }
// // // // });

// // // // // ------------------ GET all diary posts ------------------
// // // // router.get("/", async (req, res) => {
// // // //   try {
// // // //     const posts = await DiaryEntry.find()
// // // //       .populate("user", "name email profilePic")
// // // //       .populate("comments")
// // // //       .sort({ createdAt: -1 });
// // // //     res.json(posts);
// // // //   } catch (err) {
// // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // //   }
// // // // });

// // // // // ------------------ GET single diary post ------------------
// // // // router.get("/:id", auth, async (req, res) => {
// // // //   try {
// // // //     const post = await DiaryEntry.findById(req.params.id)
// // // //       .populate("user", "name email profilePic")
// // // //       .populate("comments");

// // // //     if (!post) return res.status(404).json({ msg: "Post not found" });
// // // //     res.json(post);
// // // //   } catch (err) {
// // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // //   }
// // // // });

// // // // // ------------------ UPDATE diary post (owner only) ------------------
// // // // router.put("/:id", auth, async (req, res) => {
// // // //   try {
// // // //     const { title, description, location, media } = req.body;

// // // //     const post = await DiaryEntry.findById(req.params.id);
// // // //     if (!post) return res.status(404).json({ msg: "Post not found" });

// // // //     if (post.user.toString() !== req.user.id) {
// // // //       return res.status(403).json({ msg: "Not authorized" });
// // // //     }

// // // //     post.title = title || post.title;
// // // //     post.description = description || post.description;
// // // //     post.location = location || post.location;
// // // //     post.media = media || post.media;

// // // //     await post.save();
// // // //     res.json({ msg: "Post updated successfully", post });
// // // //   } catch (err) {
// // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // //   }
// // // // });

// // // // // ------------------ DELETE diary post (owner OR admin) ------------------
// // // // router.delete("/:id", auth, async (req, res) => {
// // // //   try {
// // // //     const post = await DiaryEntry.findById(req.params.id);
// // // //     if (!post) return res.status(404).json({ msg: "Post not found" });

// // // //     if (post.user.toString() !== req.user.id && req.user.role !== "admin") {
// // // //       return res.status(403).json({ msg: "Not authorized to delete this post" });
// // // //     }

// // // //     await post.deleteOne();
// // // //     res.json({ msg: "Post deleted successfully" });
// // // //   } catch (err) {
// // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // //   }
// // // // });

// // // // // ------------------ LIKE / UNLIKE a post ------------------
// // // // router.put("/like/:id", auth, async (req, res) => {
// // // //   try {
// // // //     const post = await DiaryEntry.findById(req.params.id);
// // // //     if (!post) return res.status(404).json({ msg: "Post not found" });

// // // //     const userId = req.user.id;
// // // //     if (post.likes.includes(userId)) {
// // // //       post.likes = post.likes.filter((id) => id.toString() !== userId); // unlike
// // // //     } else {
// // // //       post.likes.push(userId); // like
// // // //     }

// // // //     await post.save();
// // // //     res.json({
// // // //       msg: post.likes.includes(userId) ? "Post liked" : "Post unliked",
// // // //       likesCount: post.likes.length,
// // // //       likes: post.likes,
// // // //     });
// // // //   } catch (err) {
// // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // //   }
// // // // });

// // // // module.exports = router;








// // // const express = require("express");
// // // const router = express.Router();
// // // const auth = require("../middleware/authMiddleware");
// // // const DiaryEntry = require("../models/DiaryEntry");
// // // const multer = require("multer");
// // // const path = require("path");
// // // const fs = require("fs");

// // // // ------------------ Ensure uploads folder exists ------------------
// // // if (!fs.existsSync("uploads")) {
// // //   fs.mkdirSync("uploads");
// // // }

// // // // ------------------ MULTER CONFIG for media upload ------------------
// // // const storage = multer.diskStorage({
// // //   destination: (req, file, cb) => {
// // //     cb(null, "uploads/"); // folder to save files
// // //   },
// // //   filename: (req, file, cb) => {
// // //     cb(null, Date.now() + path.extname(file.originalname));
// // //   },
// // // });
// // // const upload = multer({ storage });

// // // // ------------------ CREATE a diary post ------------------
// // // router.post("/", auth, upload.array("media", 5), async (req, res) => {
// // //   try {
// // //     const { title, description, location } = req.body;
// // //     const media = req.files ? req.files.map((file) => file.filename) : [];

// // //     const diaryEntry = new DiaryEntry({
// // //       user: req.user.id,
// // //       title,
// // //       description,
// // //       location,
// // //       media,
// // //     });

// // //     await diaryEntry.save();
// // //     res.status(201).json({ msg: "Diary created successfully", diaryEntry });
// // //   } catch (err) {
// // //     console.error("Error saving diary:", err);
// // //     res.status(500).json({ msg: "Server error", error: err.message });
// // //   }
// // // });

// // // // ------------------ GET diaries of logged-in user ------------------
// // // router.get("/my", auth, async (req, res) => {
// // //   try {
// // //     const posts = await DiaryEntry.find({ user: req.user.id })
// // //       .populate("user", "name email profilePic")
// // //       .sort({ createdAt: -1 });

// // //     res.json(posts);
// // //   } catch (err) {
// // //     res.status(500).json({ msg: "Server error", error: err.message });
// // //   }
// // // });

// // // // ------------------ GET diaries of any user by userId ------------------
// // // router.get("/user/:id", async (req, res) => {
// // //   try {
// // //     const posts = await DiaryEntry.find({ user: req.params.id })
// // //       .populate("user", "name email profilePic")
// // //       .sort({ createdAt: -1 });

// // //     res.json(posts);
// // //   } catch (err) {
// // //     res.status(500).json({ msg: "Server error", error: err.message });
// // //   }
// // // });

// // // // ------------------ GET diary posts by location ------------------
// // // router.get("/location/:place", async (req, res) => {
// // //   try {
// // //     const posts = await DiaryEntry.find({ location: req.params.place })
// // //       .populate("user", "name profilePic")
// // //       .populate("comments")
// // //       .sort({ createdAt: -1 });

// // //     res.json({ posts });
// // //   } catch (err) {
// // //     res.status(500).json({ msg: "Server error", error: err.message });
// // //   }
// // // });

// // // // ------------------ GET all diary posts ------------------
// // // router.get("/", async (req, res) => {
// // //   try {
// // //     const posts = await DiaryEntry.find()
// // //       .populate("user", "name email profilePic")
// // //       .populate("comments")
// // //       .sort({ createdAt: -1 });
// // //     res.json(posts);
// // //   } catch (err) {
// // //     res.status(500).json({ msg: "Server error", error: err.message });
// // //   }
// // // });

// // // // ------------------ GET single diary post ------------------
// // // router.get("/:id", auth, async (req, res) => {
// // //   try {
// // //     const post = await DiaryEntry.findById(req.params.id)
// // //       .populate("user", "name email profilePic")
// // //       .populate("comments");

// // //     if (!post) return res.status(404).json({ msg: "Post not found" });
// // //     res.json(post);
// // //   } catch (err) {
// // //     res.status(500).json({ msg: "Server error", error: err.message });
// // //   }
// // // });

// // // // ------------------ UPDATE diary post (owner only) ------------------
// // // router.put("/:id", auth, async (req, res) => {
// // //   try {
// // //     const { title, description, location, media } = req.body;

// // //     const post = await DiaryEntry.findById(req.params.id);
// // //     if (!post) return res.status(404).json({ msg: "Post not found" });

// // //     if (post.user.toString() !== req.user.id) {
// // //       return res.status(403).json({ msg: "Not authorized" });
// // //     }

// // //     post.title = title || post.title;
// // //     post.description = description || post.description;
// // //     post.location = location || post.location;
// // //     post.media = media || post.media;

// // //     await post.save();
// // //     res.json({ msg: "Post updated successfully", post });
// // //   } catch (err) {
// // //     res.status(500).json({ msg: "Server error", error: err.message });
// // //   }
// // // });

// // // // ------------------ DELETE diary post (owner OR admin) ------------------
// // // router.delete("/:id", auth, async (req, res) => {
// // //   try {
// // //     const post = await DiaryEntry.findById(req.params.id);
// // //     if (!post) return res.status(404).json({ msg: "Post not found" });

// // //     if (post.user.toString() !== req.user.id && req.user.role !== "admin") {
// // //       return res.status(403).json({ msg: "Not authorized to delete this post" });
// // //     }

// // //     await post.deleteOne();
// // //     res.json({ msg: "Post deleted successfully" });
// // //   } catch (err) {
// // //     res.status(500).json({ msg: "Server error", error: err.message });
// // //   }
// // // });

// // // // ------------------ LIKE / UNLIKE a post ------------------
// // // router.put("/like/:id", auth, async (req, res) => {
// // //   try {
// // //     const post = await DiaryEntry.findById(req.params.id);
// // //     if (!post) return res.status(404).json({ msg: "Post not found" });

// // //     const userId = req.user.id;
// // //     if (post.likes.includes(userId)) {
// // //       post.likes = post.likes.filter((id) => id.toString() !== userId); // unlike
// // //     } else {
// // //       post.likes.push(userId); // like
// // //     }

// // //     await post.save();
// // //     res.json({
// // //       msg: post.likes.includes(userId) ? "Post liked" : "Post unliked",
// // //       likesCount: post.likes.length,
// // //       likes: post.likes,
// // //     });
// // //   } catch (err) {
// // //     res.status(500).json({ msg: "Server error", error: err.message });
// // //   }
// // // });

// // // module.exports = router;















// // const express = require("express");
// // const router = express.Router();
// // const auth = require("../middleware/authMiddleware");
// // const DiaryEntry = require("../models/DiaryEntry");
// // const multer = require("multer");
// // const path = require("path");
// // const fs = require("fs");

// // // ------------------ Ensure uploads folder exists ------------------
// // if (!fs.existsSync("uploads")) {
// //   fs.mkdirSync("uploads");
// // }

// // // ------------------ MULTER CONFIG for media upload ------------------
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, "uploads/"); // folder to save files
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + path.extname(file.originalname));
// //   },
// // });
// // const upload = multer({ storage });

// // // ------------------ CREATE a diary post ------------------
// // router.post("/", auth, upload.array("media", 5), async (req, res) => {
// //   try {
// //     const { title, description, location } = req.body;
// //     const media = req.files ? req.files.map((file) => file.filename) : [];

// //     const diaryEntry = new DiaryEntry({
// //       user: req.user.id,
// //       title,
// //       description,
// //       location,
// //       media,
// //     });

// //     await diaryEntry.save();
// //     res.status(201).json({ msg: "Diary created successfully", diaryEntry });
// //   } catch (err) {
// //     console.error("Error saving diary:", err);
// //     res.status(500).json({ msg: "Server error", error: err.message });
// //   }
// // });

// // // ------------------ GET diaries of logged-in user ------------------
// // router.get("/my", auth, async (req, res) => {
// //   try {
// //     const posts = await DiaryEntry.find({ user: req.user.id })
// //       .populate("user", "name email profilePic")
// //       .sort({ createdAt: -1 });

// //     res.json(posts);
// //   } catch (err) {
// //     res.status(500).json({ msg: "Server error", error: err.message });
// //   }
// // });

// // // ------------------ GET diaries of any user by userId ------------------
// // router.get("/user/:id", async (req, res) => {
// //   try {
// //     const posts = await DiaryEntry.find({ user: req.params.id })
// //       .populate("user", "name email profilePic")
// //       .sort({ createdAt: -1 });

// //     res.json(posts);
// //   } catch (err) {
// //     res.status(500).json({ msg: "Server error", error: err.message });
// //   }
// // });

// // // ------------------ GET diary posts by location ------------------
// // router.get("/location/:place", async (req, res) => {
// //   try {
// //     const posts = await DiaryEntry.find({ location: req.params.place })
// //       .populate("user", "name profilePic")
// //       .populate("comments")
// //       .sort({ createdAt: -1 });

// //     res.json({ posts });
// //   } catch (err) {
// //     res.status(500).json({ msg: "Server error", error: err.message });
// //   }
// // });

// // // ------------------ GET all diary posts ------------------
// // router.get("/", async (req, res) => {
// //   try {
// //     const posts = await DiaryEntry.find()
// //       .populate("user", "name email profilePic")
// //       .populate("comments")
// //       .sort({ createdAt: -1 });
// //     res.json(posts);
// //   } catch (err) {
// //     res.status(500).json({ msg: "Server error", error: err.message });
// //   }
// // });

// // // ------------------ GET single diary post ------------------
// // // ⚡ Keep this LAST to avoid conflicts with /my or /user/:id
// // router.get("/:id", auth, async (req, res) => {
// //   try {
// //     const post = await DiaryEntry.findById(req.params.id)
// //       .populate("user", "name email profilePic")
// //       .populate("comments");

// //     if (!post) return res.status(404).json({ msg: "Post not found" });
// //     res.json(post);
// //   } catch (err) {
// //     res.status(500).json({ msg: "Server error", error: err.message });
// //   }
// // });

// // // ------------------ UPDATE diary post (owner only) ------------------
// // router.put("/:id", auth, async (req, res) => {
// //   try {
// //     const { title, description, location, media } = req.body;

// //     const post = await DiaryEntry.findById(req.params.id);
// //     if (!post) return res.status(404).json({ msg: "Post not found" });

// //     if (post.user.toString() !== req.user.id) {
// //       return res.status(403).json({ msg: "Not authorized" });
// //     }

// //     post.title = title || post.title;
// //     post.description = description || post.description;
// //     post.location = location || post.location;
// //     post.media = media || post.media;

// //     await post.save();
// //     res.json({ msg: "Post updated successfully", post });
// //   } catch (err) {
// //     res.status(500).json({ msg: "Server error", error: err.message });
// //   }
// // });

// // // ------------------ DELETE diary post (owner OR admin) ------------------
// // router.delete("/:id", auth, async (req, res) => {
// //   try {
// //     const post = await DiaryEntry.findById(req.params.id);
// //     if (!post) return res.status(404).json({ msg: "Post not found" });

// //     if (post.user.toString() !== req.user.id && req.user.role !== "admin") {
// //       return res.status(403).json({ msg: "Not authorized to delete this post" });
// //     }

// //     await post.deleteOne();
// //     res.json({ msg: "Post deleted successfully" });
// //   } catch (err) {
// //     res.status(500).json({ msg: "Server error", error: err.message });
// //   }
// // });

// // // ------------------ LIKE / UNLIKE a post ------------------
// // router.put("/like/:id", auth, async (req, res) => {
// //   try {
// //     const post = await DiaryEntry.findById(req.params.id);
// //     if (!post) return res.status(404).json({ msg: "Post not found" });

// //     const userId = req.user.id;
// //     if (post.likes.includes(userId)) {
// //       post.likes = post.likes.filter((id) => id.toString() !== userId); // unlike
// //     } else {
// //       post.likes.push(userId); // like
// //     }

// //     await post.save();
// //     res.json({
// //       msg: post.likes.includes(userId) ? "Post liked" : "Post unliked",
// //       likesCount: post.likes.length,
// //       likes: post.likes,
// //     });
// //   } catch (err) {
// //     res.status(500).json({ msg: "Server error", error: err.message });
// //   }
// // });

// // module.exports = router;







// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/authMiddleware");
// const DiaryEntry = require("../models/DiaryEntry");
// const { upload, deleteImage, getPublicIdFromUrl } = require("../utils/cloudinary");

// // ------------------ CREATE a diary post ------------------
// router.post("/", auth, upload.array("media", 5), async (req, res) => {
//   try {
//     const { title, description, location } = req.body;
    
//     // Get Cloudinary URLs from uploaded files
//     const media = req.files ? req.files.map((file) => file.path) : [];

//     const diaryEntry = new DiaryEntry({
//       user: req.user.id,
//       title,
//       description,
//       location,
//       media,
//     });

//     await diaryEntry.save();
//     res.status(201).json({ msg: "Diary created successfully", diaryEntry });
//   } catch (err) {
//     console.error("Error saving diary:", err);
    
//     // Clean up uploaded files if there's an error
//     if (req.files && req.files.length > 0) {
//       for (const file of req.files) {
//         try {
//           const publicId = getPublicIdFromUrl(file.path);
//           if (publicId) {
//             await deleteImage(publicId);
//           }
//         } catch (cleanupError) {
//           console.error("Error cleaning up file:", cleanupError);
//         }
//       }
//     }
    
//     res.status(500).json({ msg: "Server error", error: err.message });
//   }
// });

// // ------------------ GET diaries of logged-in user ------------------
// router.get("/my", auth, async (req, res) => {
//   try {
//     const posts = await DiaryEntry.find({ user: req.user.id })
//       .populate("user", "name email profilePic")
//       .sort({ createdAt: -1 });

//     res.json(posts);
//   } catch (err) {
//     res.status(500).json({ msg: "Server error", error: err.message });
//   }
// });

// // ------------------ GET diaries of any user by userId ------------------
// router.get("/user/:id", async (req, res) => {
//   try {
//     const posts = await DiaryEntry.find({ user: req.params.id })
//       .populate("user", "name email profilePic")
//       .sort({ createdAt: -1 });

//     res.json(posts);
//   } catch (err) {
//     res.status(500).json({ msg: "Server error", error: err.message });
//   }
// });

// // ------------------ GET diary posts by location ------------------
// router.get("/location/:place", async (req, res) => {
//   try {
//     const posts = await DiaryEntry.find({ location: req.params.place })
//       .populate("user", "name profilePic")
//       .populate("comments")
//       .sort({ createdAt: -1 });

//     res.json({ posts });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error", error: err.message });
//   }
// });

// // ------------------ GET all diary posts ------------------
// router.get("/", async (req, res) => {
//   try {
//     const posts = await DiaryEntry.find()
//       .populate("user", "name email profilePic")
//       .populate("comments")
//       .sort({ createdAt: -1 });
//     res.json(posts);
//   } catch (err) {
//     res.status(500).json({ msg: "Server error", error: err.message });
//   }
// });

// // ------------------ GET single diary post ------------------
// router.get("/:id", auth, async (req, res) => {
//   try {
//     const post = await DiaryEntry.findById(req.params.id)
//       .populate("user", "name email profilePic")
//       .populate("comments");

//     if (!post) return res.status(404).json({ msg: "Post not found" });
//     res.json(post);
//   } catch (err) {
//     res.status(500).json({ msg: "Server error", error: err.message });
//   }
// });

// // ------------------ UPDATE diary post (owner only) ------------------
// router.put("/:id", auth, upload.array("media", 5), async (req, res) => {
//   try {
//     const { title, description, location, existingMedia } = req.body;
//     const post = await DiaryEntry.findById(req.params.id);
    
//     if (!post) return res.status(404).json({ msg: "Post not found" });
//     if (post.user.toString() !== req.user.id) {
//       return res.status(403).json({ msg: "Not authorized" });
//     }

//     // Handle new media uploads
//     const newMedia = req.files ? req.files.map((file) => file.path) : [];
    
//     // Parse existing media (if provided as string array)
//     let existingMediaArray = [];
//     if (existingMedia) {
//       existingMediaArray = Array.isArray(existingMedia) 
//         ? existingMedia 
//         : JSON.parse(existingMedia);
//     }

//     // Combine existing and new media
//     const updatedMedia = [...existingMediaArray, ...newMedia];

//     // Update post
//     post.title = title || post.title;
//     post.description = description || post.description;
//     post.location = location || post.location;
//     post.media = updatedMedia;

//     await post.save();
//     res.json({ msg: "Post updated successfully", post });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error", error: err.message });
//   }
// });

// // ------------------ DELETE diary post (owner OR admin) ------------------
// router.delete("/:id", auth, async (req, res) => {
//   try {
//     const post = await DiaryEntry.findById(req.params.id);
//     if (!post) return res.status(404).json({ msg: "Post not found" });

//     if (post.user.toString() !== req.user.id && req.user.role !== "admin") {
//       return res.status(403).json({ msg: "Not authorized to delete this post" });
//     }

//     // Delete media files from Cloudinary
//     if (post.media && post.media.length > 0) {
//       for (const mediaUrl of post.media) {
//         try {
//           const publicId = getPublicIdFromUrl(mediaUrl);
//           if (publicId) {
//             await deleteImage(publicId);
//           }
//         } catch (deleteError) {
//           console.error("Error deleting media file:", deleteError);
//         }
//       }
//     }

//     await post.deleteOne();
//     res.json({ msg: "Post deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error", error: err.message });
//   }
// });

// // ------------------ LIKE / UNLIKE a post ------------------
// router.put("/like/:id", auth, async (req, res) => {
//   try {
//     const post = await DiaryEntry.findById(req.params.id);
//     if (!post) return res.status(404).json({ msg: "Post not found" });

//     const userId = req.user.id;
//     if (post.likes.includes(userId)) {
//       post.likes = post.likes.filter((id) => id.toString() !== userId); // unlike
//     } else {
//       post.likes.push(userId); // like
//     }

//     await post.save();
//     res.json({
//       msg: post.likes.includes(userId) ? "Post liked" : "Post unliked",
//       likesCount: post.likes.length,
//       likes: post.likes,
//     });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error", error: err.message });
//   }
// });

// module.exports = router;









const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const DiaryEntry = require("../models/DiaryEntry");
const { upload, deleteImage, getPublicIdFromUrl } = require("../utils/cloudinary");

// ------------------ CREATE a diary post ------------------
router.post("/", auth, upload.array("media", 5), async (req, res) => {
  try {
    const { title, description, location } = req.body;
    
    // Get Cloudinary URLs from uploaded files
    const media = req.files ? req.files.map((file) => file.path) : [];

    const diaryEntry = new DiaryEntry({
      user: req.user.id,
      title,
      description,
      location,
      media,
    });

    await diaryEntry.save();
    res.status(201).json({ msg: "Diary created successfully", diaryEntry });
  } catch (err) {
    console.error("Error saving diary:", err);
    
    // Clean up uploaded files if there's an error
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const publicId = getPublicIdFromUrl(file.path);
          if (publicId) {
            await deleteImage(publicId);
          }
        } catch (cleanupError) {
          console.error("Error cleaning up file:", cleanupError);
        }
      }
    }
    
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// ------------------ GET diaries of logged-in user ------------------
router.get("/my", auth, async (req, res) => {
  try {
    const posts = await DiaryEntry.find({ user: req.user.id })
      .populate("user", "name email profilePic")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// ------------------ GET diaries of any user by userId ------------------
router.get("/user/:id", async (req, res) => {
  try {
    const posts = await DiaryEntry.find({ user: req.params.id })
      .populate("user", "name email profilePic")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// ------------------ GET diary posts by location ------------------
router.get("/location/:place", async (req, res) => {
  try {
    const posts = await DiaryEntry.find({ location: req.params.place })
      .populate("user", "name profilePic")
      .populate("comments")
      .sort({ createdAt: -1 });

    res.json({ posts });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// ------------------ GET all diary posts ------------------
router.get("/", async (req, res) => {
  try {
    const posts = await DiaryEntry.find()
      .populate("user", "name email profilePic")
      .populate("comments")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// ------------------ GET single diary post ------------------
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await DiaryEntry.findById(req.params.id)
      .populate("user", "name email profilePic")
      .populate("comments");

    if (!post) return res.status(404).json({ msg: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// ------------------ UPDATE diary post (owner only) ------------------
router.put("/:id", auth, upload.array("media", 5), async (req, res) => {
  try {
    const { title, description, location, existingMedia } = req.body;
    const post = await DiaryEntry.findById(req.params.id);
    
    if (!post) return res.status(404).json({ msg: "Post not found" });
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    // Handle new media uploads
    const newMedia = req.files ? req.files.map((file) => file.path) : [];
    
    // Parse existing media (if provided as string array)
    let existingMediaArray = [];
    if (existingMedia) {
      existingMediaArray = Array.isArray(existingMedia) 
        ? existingMedia 
        : JSON.parse(existingMedia);
    }

    // Combine existing and new media
    const updatedMedia = [...existingMediaArray, ...newMedia];

    // Update post
    post.title = title || post.title;
    post.description = description || post.description;
    post.location = location || post.location;
    post.media = updatedMedia;

    await post.save();
    res.json({ msg: "Post updated successfully", post });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// ------------------ DELETE diary post (owner OR admin) ------------------
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await DiaryEntry.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    if (post.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ msg: "Not authorized to delete this post" });
    }

    // Delete media files from Cloudinary
    if (post.media && post.media.length > 0) {
      for (const mediaUrl of post.media) {
        try {
          const publicId = getPublicIdFromUrl(mediaUrl);
          if (publicId) {
            await deleteImage(publicId);
          }
        } catch (deleteError) {
          console.error("Error deleting media file:", deleteError);
        }
      }
    }

    await post.deleteOne();
    res.json({ msg: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// ------------------ LIKE / UNLIKE a post ------------------
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await DiaryEntry.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    const userId = req.user.id;
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id.toString() !== userId); // unlike
    } else {
      post.likes.push(userId); // like
    }

    await post.save();
    res.json({
      msg: post.likes.includes(userId) ? "Post liked" : "Post unliked",
      likesCount: post.likes.length,
      likes: post.likes,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;