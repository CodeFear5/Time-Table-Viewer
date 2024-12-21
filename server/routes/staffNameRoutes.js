import express from "express";
import {
  addStaffName,
  getAllStaffNames,
  deleteStaffName,
  updateStaffName,
} from "../controllers/staffNameController.js";

const router = express.Router();

router.post("/", addStaffName); // Add a new staff name
router.get("/", getAllStaffNames); // Get all staff names
router.delete("/:id", deleteStaffName); // Delete a staff name
router.put("/:id", updateStaffName); // Update a staff name

export default router;
