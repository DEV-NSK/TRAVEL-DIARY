// const DiaryEntry = require("../models/DiaryEntry");

// exports.createDiaryEntry = async (req, res) => {
//   try {
//     const { title, description, location, lat, lng } = req.body;

//     const diaryEntry = new DiaryEntry({
//       user: req.user.id,
//       title,
//       description,
//       location,
//       media: req.files ? req.files.map(file => file.path) : []
//     });

//     await diaryEntry.save();

//     res.status(201).json({ msg: "Diary created successfully", diaryEntry });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error", error: err.message });
//   }
// };



const DiaryEntry = require("../models/DiaryEntry");

exports.createDiaryEntry = async (req, res) => {
  try {
    const { title, description, location } = req.body;

    const diaryEntry = new DiaryEntry({
      user: req.user.id,
      title,
      description,
      location,
      media: req.files ? req.files.map((file) => file.path) : [], // ✅ consistent
    });

    await diaryEntry.save();
    res.status(201).json({ msg: "Diary created successfully", diaryEntry });
  } catch (err) {
    console.error("Error creating diary entry:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
