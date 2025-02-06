import TeacherFile from '../models/teacherFileModel.js';
import fs from 'fs';
import path from 'path';

export const checkFile = async (req, res) => {
  try {
    const teacherName = req.params.teacherName;
    const file = await TeacherFile.findOne({ teacherName });

    if (file) {
      res.status(200).json({ exists: true, file });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const uploadFile = async (req, res) => {
  try {
    const { teacherName, category } = req.body;

    if (!req.file || !teacherName || !category) {
      return res.status(400).json({ error: 'Missing required fields or file' });
    }

    const newFile = new TeacherFile({
      teacherName,
      category,
      filePath: req.file.path,
    });

    await newFile.save();
    res.status(201).json({ message: 'File uploaded successfully', file: newFile });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const editFile = async (req, res) => {
  try {
    const fileId = req.params.id;

    const existingFile = await TeacherFile.findById(fileId);
    if (!existingFile) {
      return res.status(404).json({ error: 'File not found' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'File not provided' });
    }

    // Delete old file
    fs.unlinkSync(existingFile.filePath);

    // Update record
    existingFile.filePath = req.file.path;
    await existingFile.save();

    res.status(200).json({ message: 'File updated successfully', file: existingFile });
  } catch (error) {
    console.error('Error editing file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getFile = async (req, res) => {
  try {
    const teacherName = req.params.teacherName;
    const file = await TeacherFile.findOne({ teacherName });

    if (file) {
      res.status(200).json({
        file: {
          name: path.basename(file.filePath),
          url: `https://time-table-viewer.onrender.com/${file.filePath}`,
        },
      });
    } else {
      res.status(200).json({ file: null });
    }
  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
