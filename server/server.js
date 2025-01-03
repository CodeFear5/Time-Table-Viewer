import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./utils/dbConnection.js";

// Import Routes
import teacherRoutes from "./routes/teacherRoutes.js";
//import classRoutes from "./routes/classRoutes.js";
import labRoomRoutes from "./routes/labRoomRoutes.js";
import staffNameRoutes from "./routes/staffNameRoutes.js";
import classRoomRoutes from "./routes/classRoomRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cloudinary from 'cloudinary';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use(cors({
  origin: ['https://time-table-viewer.vercel.app'],
  methods: 'GET,POST,PUT,DELETE', // Specify allowed HTTP methods
  allowedHeaders: 'Content-Type, Authorization', // Specify allowed headers
}));

app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// Database connection
dbConnection();

// Routes
app.use("/staff", teacherRoutes); // Teacher routes
//app.use("/class", classRoutes); // Class timetable routes
app.use("/api/labrooms", labRoomRoutes); // Lab room routes
app.use("/api/staffnames", staffNameRoutes); // Staff names routes
app.use("/api/classRoom", classRoomRoutes); // Classrooms routes
app.use("/api", authRoutes); // Authentication routes

// Base route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});