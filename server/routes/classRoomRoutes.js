import express from "express";
import {
  addClassRoom,
  getAllClassRooms,
  deleteClassRoom,
  updateClassRoom,
} from "../controllers/classRoomController.js";

const router = express.Router();

router.post("/", addClassRoom); // Add a new classroom
router.get("/", getAllClassRooms); // Get all classrooms
router.delete("/:id", deleteClassRoom); // Delete a classroom
router.put("/:id", updateClassRoom); // Update a classroom

export default router;
