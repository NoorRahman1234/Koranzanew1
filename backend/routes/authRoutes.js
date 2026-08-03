

import express from "express";
import { profileUpload } from "../middleware/upload.js";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  deleteAccount,
  uploadProfileImage,
  changePassword,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getCurrentUser);
router.delete("/delete-account", authMiddleware, deleteAccount);
router.put(
  "/upload-profile",
  authMiddleware,
  profileUpload.single("profileImage"),
  uploadProfileImage
);
router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

export default router;