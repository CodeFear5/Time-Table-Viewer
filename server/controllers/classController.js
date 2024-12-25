// Updated ClassFile Controllers
import ClassFile from "../models/ClassFileModel.js"; // Ensure this path works in your project setup
import fs from "fs";
import path from "path";

// Check if Class File Exists
export const checkClassFile = async (req, res) => {
  try {
    const { semester, section } = req.params;
    const file = await ClassFile.findOne({ semester, section });
    console.log("Checking file existence");

    if (file) {
      res.status(200).json({ exists: true, file });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking file existence:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Upload Class File
export const uploadClassFile = async (req, res) => {
  try {
    const { semester, section, category } = req.body;

    if (!req.file || !semester || !section || !category) {
      return res.status(400).json({ error: "Missing required fields or file" });
    }

    const newFile = new ClassFile({
      semester,
      section,
      category,
      filePath: req.file.path,
    });

    await newFile.save();
    res.status(201).json({
      message: "Class timetable file uploaded successfully",
      file: newFile,
    });
  } catch (error) {
    console.error("Error uploading class timetable file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Edit Class File
export const editClassFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const { semester, section, category } = req.body;

    const existingFile = await ClassFile.findById(fileId);
    if (!existingFile) {
      return res.status(404).json({ error: "File not found" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "File not provided" });
    }

    // Update details
    if (semester) existingFile.semester = semester;
    if (section) existingFile.section = section;
    if (category) existingFile.category = category;

    // Remove old file
    fs.unlinkSync(existingFile.filePath);

    // Update file path
    existingFile.filePath = req.file.path;
    await existingFile.save();

    res.status(200).json({
      message: "Class timetable file updated successfully",
      file: existingFile,
    });
  } catch (error) {
    console.error("Error editing class timetable file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Class File
export const getClassFile = async (req, res) => {
  try {
    const { semester, section } = req.params;
    const file = await ClassFile.findOne({ semester, section });

    if (file) {
      res.status(200).json({
        file: {
          name: path.basename(file.filePath),
          url: `${req.protocol}://${req.get("host")}/${file.filePath}`,
        },
      });
    } else {
      res.status(200).json({ file: null });
    }
  } catch (error) {
    console.error("Error fetching file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
