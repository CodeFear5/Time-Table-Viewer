import mongoose from 'mongoose';

const classFileSchema = new mongoose.Schema({
  semester: { type: String, required: true },
  section: { type: String, required: true },
  category: { type: String, required: true },
  filePath: { type: String, required: true },
});

const ClassFile = mongoose.model('ClassFile', classFileSchema);

export default ClassFile;
