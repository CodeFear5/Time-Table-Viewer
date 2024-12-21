import StaffName from "../models/StaffNameUpdate.js";

export const addStaffName = async (req, res) => {
  try {
    const { staffName } = req.body;
    if (!staffName) return res.status(400).json({ message: "Staff name is required" });

    const newStaff = new StaffName({ staffName });
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (error) {
    console.error("Error adding staff name:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllStaffNames = async (req, res) => {
  try {
    const staffNames = await StaffName.find();
    res.status(200).json(staffNames);
  } catch (error) {
    console.error("Error fetching staff names:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteStaffName = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStaff = await StaffName.findByIdAndDelete(id);
    if (!deletedStaff) return res.status(404).json({ message: "Staff name not found" });

    res.status(200).json({ message: "Staff name deleted successfully" });
  } catch (error) {
    console.error("Error deleting staff name:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateStaffName = async (req, res) => {
  try {
    const { id } = req.params;
    const { staffName } = req.body;

    const updatedStaff = await StaffName.findByIdAndUpdate(
      id,
      { staffName },
      { new: true }
    );

    if (!updatedStaff) return res.status(404).json({ message: "Staff name not found" });

    res.status(200).json(updatedStaff);
  } catch (error) {
    console.error("Error updating staff name:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
