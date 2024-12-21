import mongoose from 'mongoose';

const labroomFileSchema = new mongoose.Schema({
  labroomName: {
    type: String,
    required: true, // The name of the labroom (e.g., Lab A, Lab B, etc.)
  },
  category: {
    type: String,
    required: true, // This will always be "Labrooms"
  },
  filePath: {
    type: String,
    required: true, // Path to the file
  },
});

const LabroomFile = mongoose.model('LabroomFile', labroomFileSchema);

export default LabroomFile;
