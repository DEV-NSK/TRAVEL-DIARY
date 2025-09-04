// // const cloudinary = require('cloudinary').v2;
// // const { CloudinaryStorage } = require('multer-storage-cloudinary');
// // const multer = require('multer');

// // // Configure Cloudinary storage
// // const storage = new CloudinaryStorage({
// //   cloudinary: cloudinary,
// //   params: {
// //     folder: 'travel-diary',
// //     format: async (req, file) => {
// //       // Determine format based on file mimetype
// //       const format = file.mimetype.split('/')[1];
// //       return format;
// //     },
// //     public_id: (req, file) => {
// //       return `diary-${Date.now()}`;
// //     },
// //   },
// // });

// // const upload = multer({ 
// //   storage: storage,
// //   limits: {
// //     fileSize: 5 * 1024 * 1024, // 5MB limit
// //   },
// //   fileFilter: (req, file, cb) => {
// //     // Check if file is an image
// //     if (file.mimetype.startsWith('image/')) {
// //       cb(null, true);
// //     } else {
// //       cb(new Error('Only image files are allowed!'), false);
// //     }
// //   }
// // });

// // // Function to delete image from Cloudinary
// // const deleteImage = async (publicId) => {
// //   try {
// //     const result = await cloudinary.uploader.destroy(publicId);
// //     return result;
// //   } catch (error) {
// //     console.error('Error deleting image from Cloudinary:', error);
// //     throw error;
// //   }
// // };

// // // Function to extract public ID from Cloudinary URL
// // const getPublicIdFromUrl = (url) => {
// //   const matches = url.match(/\/upload\/v\d+\/(.+)\.\w+$/);
// //   return matches ? matches[1] : null;
// // };

// // module.exports = {
// //   upload,
// //   deleteImage,
// //   getPublicIdFromUrl,
// //   cloudinary
// // };






// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const multer = require('multer');

// // Check if Cloudinary credentials exist
// const hasCloudinaryConfig = 
//   process.env.CLOUDINARY_CLOUD_NAME && 
//   process.env.CLOUDINARY_API_KEY && 
//   process.env.CLOUDINARY_API_SECRET;

// if (hasCloudinaryConfig) {
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });
// }

// let storage;
// let upload;

// if (hasCloudinaryConfig) {
//   try {
//     storage = new CloudinaryStorage({
//       cloudinary: cloudinary,
//       params: {
//         folder: 'travel-diary',
//         allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
//         transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
//       },
//     });

//     upload = multer({ 
//       storage: storage,
//       limits: {
//         fileSize: 5 * 1024 * 1024,
//       },
//       fileFilter: (req, file, cb) => {
//         if (file.mimetype.startsWith('image/')) {
//           cb(null, true);
//         } else {
//           cb(new Error('Only images are allowed'), false);
//         }
//       }
//     });
//   } catch (error) {
//     console.error('Cloudinary setup failed:', error);
//     // Fallback to memory storage
//     const memoryStorage = multer.memoryStorage();
//     upload = multer({ storage: memoryStorage });
//   }
// } else {
//   console.warn('Cloudinary credentials missing - using memory storage');
//   const memoryStorage = multer.memoryStorage();
//   upload = multer({ storage: memoryStorage });
// }

// // Utility functions
// const deleteImage = async (publicId) => {
//   if (!hasCloudinaryConfig) return;
//   try {
//     await cloudinary.uploader.destroy(publicId);
//   } catch (error) {
//     console.error('Error deleting image from Cloudinary:', error);
//   }
// };

// const getPublicIdFromUrl = (url) => {
//   if (!url || !hasCloudinaryConfig) return null;
//   const matches = url.match(/\/upload\/v\d+\/(.+)\.\w+$/);
//   return matches ? matches[1] : null;
// };

// module.exports = {
//   upload,
//   deleteImage,
//   getPublicIdFromUrl,
//   cloudinary,
//   hasCloudinaryConfig
// };