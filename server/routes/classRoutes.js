import express from "express";
import upload from "../middlewares/multerConfig.js";
import {
  checkClassFile,
  uploadClassFile,
  editClassFile,
  getClassFile,
} from "../controllers/classController.js";

const router = express.Router();

router.get("/check-file/:semester/:section", checkClassFile);
router.post("/upload", upload.single("file"), uploadClassFile);
router.post("/edit/:id", upload.single("file"), editClassFile);
router.get("/file/:semester/:section", getClassFile);

export default router;
