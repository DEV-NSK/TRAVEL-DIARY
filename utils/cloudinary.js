const cloudinary = require("cloudinary").v2;
const fs = require("fs");
// ------------------ Cloudinary Config ------------------
cloudinary.config({
  cloud_name: "dmabivh1d",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath, folder = "diary_media") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "auto",
    });

    // delete file locally after upload
    fs.unlinkSync(filePath);

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

module.exports = { uploadToCloudinary };
