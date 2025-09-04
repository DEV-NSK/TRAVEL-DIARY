const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'travel-diary',
    format: async (req, file) => {
      // Determine format based on file mimetype
      const format = file.mimetype.split('/')[1];
      return format;
    },
    public_id: (req, file) => {
      return `diary-${Date.now()}`;
    },
  },
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Function to delete image from Cloudinary
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw error;
  }
};

// Function to extract public ID from Cloudinary URL
const getPublicIdFromUrl = (url) => {
  const matches = url.match(/\/upload\/v\d+\/(.+)\.\w+$/);
  return matches ? matches[1] : null;
};

module.exports = {
  upload,
  deleteImage,
  getPublicIdFromUrl,
  cloudinary
};