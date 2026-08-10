

import express from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  deleteAccount,
  uploadProfileImage,
  changePassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { profileUpload } from "../middleware/upload.js";

const router = express.Router();

// Static & Fixed Routes First
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser);
router.put("/change-password", protect, changePassword);
// router.put("/upload-profile", protect, uploadProfileImage);
router.put(
  "/upload-profile",
  protect,
  profileUpload.single("profileImage"),
  uploadProfileImage
);

// FIXED: Static delete route registered clearly
router.delete("/delete", protect, deleteAccount);

export default router;