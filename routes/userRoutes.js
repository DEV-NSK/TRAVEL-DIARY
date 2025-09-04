
// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/authMiddleware");
// const admin = require("../middleware/adminMiddleware");
// const User = require("../models/User");

// // Admin-only routes
// router.delete("/user/:id", auth, admin, async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.json({ msg: "User deleted" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// router.post("/promote/:id", auth, admin, async (req, res) => {
//   try {
//     await User.findByIdAndUpdate(req.params.id, { role: "admin" });
//     res.json({ msg: "User promoted to admin" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// // Regular user routes
// router.get("/profile", auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     if (!user) return res.status(404).json({ msg: "User not found" });

//     res.json({ user });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// router.put("/profile", auth, async (req, res) => {
//   try {
//     const { name, bio, profilePic, location } = req.body;

//     const updatedUser = await User.findByIdAndUpdate(
//       req.user.id,
//       { name, bio, profilePic, location },
//       { new: true, runValidators: true }
//     ).select("-password");

//     res.json({ msg: "Profile updated successfully", user: updatedUser });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// module.exports = router;











const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const User = require("../models/User");
const { upload, deleteImage, getPublicIdFromUrl } = require("../utils/cloudinary");

// Admin-only routes
router.delete("/user/:id", auth, admin, async (req, res) => {
  try {
    const userToDelete = await User.findById(req.params.id);
    if (!userToDelete) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Delete profile picture from Cloudinary if it exists
    if (userToDelete.profilePic) {
      try {
        const publicId = getPublicIdFromUrl(userToDelete.profilePic);
        if (publicId) {
          await deleteImage(publicId);
        }
      } catch (deleteError) {
        console.error("Error deleting profile picture:", deleteError);
      }
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/promote/:id", auth, admin, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { role: "admin" });
    res.json({ msg: "User promoted to admin" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// Regular user routes
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// Update profile with Cloudinary image upload
router.put("/profile", auth, upload.single("profilePic"), async (req, res) => {
  try {
    const { name, bio, location } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // If new profile picture is uploaded
    if (req.file) {
      // Delete old profile picture from Cloudinary if it exists
      if (user.profilePic && user.profilePic !== "") {
        try {
          const publicId = getPublicIdFromUrl(user.profilePic);
          if (publicId) {
            await deleteImage(publicId);
          }
        } catch (deleteError) {
          console.error("Error deleting old profile picture:", deleteError);
        }
      }
      user.profilePic = req.file.path;
    }

    // Update other fields
    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.location = location || user.location;

    await user.save();

    // Return user without password
    const userResponse = await User.findById(req.user.id).select("-password");
    
    res.json({ 
      msg: "Profile updated successfully", 
      user: userResponse
    });
  } catch (err) {
    console.error(err.message);
    
    // Clean up uploaded file if there's an error
    if (req.file) {
      try {
        const publicId = getPublicIdFromUrl(req.file.path);
        if (publicId) {
          await deleteImage(publicId);
        }
      } catch (cleanupError) {
        console.error("Error cleaning up uploaded file:", cleanupError);
      }
    }
    
    res.status(500).json({ msg: "Server error" });
  }
});

// Get user by ID (public profile)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -email");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;