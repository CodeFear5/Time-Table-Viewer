import mongoose from "mongoose";

// Define the Lab Room Schema
const ClassRoomSchema = new mongoose.Schema({
    ClassRoom: { type: String, required: true, unique: true },
});

// Create the Lab Room Model
const ClassRooms = mongoose.model("ClassRooms", ClassRoomSchema);

export default ClassRooms;
