import express from 'express';
import {
  addLabRoom,
  getLabRooms,
  deleteLabRoom,
  updateLabRoom,
} from '../controllers/labRoomController.js';

const router = express.Router();

router.post('/', addLabRoom);
router.get('/', getLabRooms);
router.delete('/:id', deleteLabRoom);
router.put('/:id', updateLabRoom);

export default router;
