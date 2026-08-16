// import multer from 'multer';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
// import fs from 'fs';


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Ensure uploads directory exists
// const uploadsDir = join(__dirname, '../uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadsDir);
//   },
//   filename: (req, file, cb) => {
//     // Generate unique filename
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const ext = file.originalname.split('.').pop();
//     cb(null, 'product-' + uniqueSuffix + '.' + ext);
    
//   }
// });

// // File filter to accept only images
// const fileFilter = (req, file, cb) => {
//   const allowedMimeTypes = [
//     'image/jpeg',
//     'image/jpg',
//     'image/png',
//     'image/webp',
//     'image/gif'
//   ];

//   if (allowedMimeTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF images are allowed.'), false);
//   }
// };

// // Configure multer
// export const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024 // 5MB limit
//   }
// });

// // Error handling middleware for multer
// export const handleUploadError = (err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     if (err.code === 'LIMIT_FILE_SIZE') {
//       return res.status(400).json({
//         success: false,
//         message: 'File size too large. Maximum size is 5MB.'
//       });
//     }
//     return res.status(400).json({
//       success: false,
//       message: err.message
//     });
//   }

//   if (err) {
//     return res.status(400).json({
//       success: false,
//       message: err.message
//     });
//   }

//   next();
// };


// // Profile Image Storage
// const profileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadsDir);
//   },

//   filename: (req, file, cb) => {
//     const uniqueSuffix =
//       Date.now() + "-" + Math.round(Math.random() * 1e9);

//     const ext = file.originalname.split(".").pop();

//     cb(null, "profile-" + uniqueSuffix + "." + ext);
//   },
// });

// // Profile Upload Middleware
// export const profileUpload = multer({
//   storage: profileStorage,
//   fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024,
//   },
// });






















import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage for Products
const productStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'koreanza/products',
    allowed_formats: ['jpeg', 'jpg', 'png', 'webp', 'gif'],
  },
});

// Cloudinary storage for Profile Images
const profileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'koreanza/profiles',
    allowed_formats: ['jpeg', 'jpg', 'png', 'webp'],
  },
});

// Product Upload Middleware
export const upload = multer({
  storage: productStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Profile Upload Middleware
export const profileUpload = multer({
  storage: profileStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Error handling middleware for multer
export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 5MB.'
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  next();
};