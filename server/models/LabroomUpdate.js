import mongoose from "mongoose";

// Define the Lab Room Schema
const labRoomSchema = new mongoose.Schema({
  roomName: { type: String, required: true, unique: true },
});

// Create the Lab Room Model
const LabRoom = mongoose.model("LabRoom", labRoomSchema);

export default LabRoom;
