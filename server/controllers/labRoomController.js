import LabRoom from '../models/LabroomUpdate.js';

export const addLabRoom = async (req, res) => {
  try {
    const { roomName } = req.body;
    const newRoom = new LabRoom({ roomName });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ message: 'Error adding lab room', error });
  }
};

export const getLabRooms = async (req, res) => {
  try {
    const rooms = await LabRoom.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lab rooms', error });
  }
};

export const deleteLabRoom = async (req, res) => {
  try {
    await LabRoom.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Lab room deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting lab room', error });
  }
};

export const updateLabRoom = async (req, res) => {
  try {
    const { roomName } = req.body;
    const updatedRoom = await LabRoom.findByIdAndUpdate(
      req.params.id,
      { roomName },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: 'Error updating lab room', error });
  }
};
