import express from 'express';
import upload from '../middlewares/multerConfig.js';
import {
  checkFile,
  uploadFile,
  editFile,
  getFile,
} from '../controllers/teacherController.js';

const router = express.Router();

router.get('/check-file/:teacherName', checkFile);
router.post('/upload', upload.single('file'), uploadFile);
router.post('/edit/:id', upload.single('file'), editFile);
router.get('/file/:teacherName', getFile);

export default router;
