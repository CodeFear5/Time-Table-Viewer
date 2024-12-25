import cloudinary from 'cloudinary';
import TeacherFile from '../models/teacherFileModel.js';

// Upload file to Cloudinary
export const uploadFile = async (req, res) => {
  try {
    const { teacherName, category } = req.body;

    if (!req.file || !teacherName || !category) {
      return res.status(400).json({ error: 'Missing required fields or file' });
    }

    // Upload file to Cloudinary
    cloudinary.v2.uploader.upload(req.file.path, { resource_type: 'auto' }, async (error, result) => {
      if (error) {
        return res.status(500).json({ error: 'Error uploading file to Cloudinary' });
      }

      // Save the file data in the database
      const newFile = new TeacherFile({
        teacherName,
        category,
        filePath: result.secure_url, // Store the Cloudinary URL
        cloudinaryId: result.public_id, // Store the Cloudinary public ID for future reference (e.g., for deletion)
      });

      await newFile.save();
      res.status(201).json({ message: 'File uploaded successfully', file: newFile });
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Edit file on Cloudinary
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

    // Delete the old file from Cloudinary
    cloudinary.v2.uploader.destroy(existingFile.cloudinaryId, async (error, result) => {
      if (error) {
        return res.status(500).json({ error: 'Error deleting file from Cloudinary' });
      }

      // Upload the new file to Cloudinary
      cloudinary.v2.uploader.upload(req.file.path, { resource_type: 'auto' }, async (error, result) => {
        if (error) {
          return res.status(500).json({ error: 'Error uploading new file to Cloudinary' });
        }

        // Update the record with the new file data
        existingFile.filePath = result.secure_url; // Update with new Cloudinary URL
        existingFile.cloudinaryId = result.public_id; // Update with new Cloudinary public ID

        await existingFile.save();
        res.status(200).json({ message: 'File updated successfully', file: existingFile });
      });
    });
  } catch (error) {
    console.error('Error editing file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get file from Cloudinary (Display the URL in the response)
export const getFile = async (req, res) => {
  try {
    const teacherName = req.params.teacherName;
    const file = await TeacherFile.findOne({ teacherName });

    if (file) {
      res.status(200).json({
        file: {
          name: path.basename(file.filePath),
          url: file.filePath, // Return the Cloudinary URL directly
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
