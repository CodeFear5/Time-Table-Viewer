import mongoose from 'mongoose';

const teacherFileSchema = new mongoose.Schema({
    teacherName: { type: String, required: true },
    category: { type: String, required: true },
    filePath: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  });

const TeacherFile = mongoose.model('TeacherFile', teacherFileSchema);

export default TeacherFile;
