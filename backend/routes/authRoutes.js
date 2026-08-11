

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

router.put(
  "/upload-profile",
  protect,
  profileUpload.single("profileImage"),
  uploadProfileImage
);

// UPDATED: Route path changed from "/delete" to "/delete-account"
router.delete("/delete-account", protect, deleteAccount);

export default router;