import ClassRooms from "../models/ClassRoomUpdate.js";

export const addClassRoom = async (req, res) => {
  try {
    const { ClassRoom } = req.body;
    if (!ClassRoom) return res.status(400).json({ message: "Classroom name is required" });

    const newClassRoom = new ClassRooms({ ClassRoom });
    await newClassRoom.save();
    res.status(201).json(newClassRoom);
  } catch (error) {
    console.error("Error adding classroom:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllClassRooms = async (req, res) => {
  try {
    const classRooms = await ClassRooms.find();
    res.status(200).json(classRooms);
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteClassRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClassRoom = await ClassRooms.findByIdAndDelete(id);
    if (!deletedClassRoom) return res.status(404).json({ message: "Classroom not found" });

    res.status(200).json({ message: "Classroom deleted successfully" });
  } catch (error) {
    console.error("Error deleting classroom:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateClassRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { ClassRoom } = req.body;

    const updatedClassRoom = await ClassRooms.findByIdAndUpdate(
      id,
      { ClassRoom },
      { new: true }
    );

    if (!updatedClassRoom) return res.status(404).json({ message: "Classroom not found" });

    res.status(200).json(updatedClassRoom);
  } catch (error) {
    console.error("Error updating classroom:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
