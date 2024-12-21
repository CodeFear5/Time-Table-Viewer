import mongoose from "mongoose";

// Define the Lab Room Schema
const StaffNameSchema = new mongoose.Schema({
    staffName: { type: String, required: true, unique: true },
});

// Create the Lab Room Model
const StaffName = mongoose.model("StaffName", StaffNameSchema);

export default StaffName;
