import mongoose from 'mongoose';

const dbConnection = () => {
  mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection error:'));
  db.once('open', () => {
    console.log('MongoDB connected');
  });
};

export default dbConnection;
