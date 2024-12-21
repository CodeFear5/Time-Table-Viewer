import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // Importing react-hot-toast

const RoomsUpdate = () => {
  const [roomName, setRoomName] = useState(""); // For adding new room
  const [classRooms, setClassRooms] = useState([]); // List of classrooms
  const [editRoomId, setEditRoomId] = useState(null); // ID of the room being edited
  const [editRoomName, setEditRoomName] = useState(""); // Name of the room being edited

  // States for confirmation modals
  const [showConfirmSave, setShowConfirmSave] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [actionType, setActionType] = useState(""); // to determine save or delete action
  const [currentActionId, setCurrentActionId] = useState(null);

  // Fetch all classrooms on initial load
  const fetchClassrooms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/classRoom");
      setClassRooms(response.data);
    } catch (error) {
      console.error("Error fetching classrooms:", error);
    }
  };

  useEffect(() => {
    fetchClassrooms();
  }, []);

  // Add new classroom
  const addClassRoom = async () => {
    if (!roomName) return; // Don't add if room name is empty
    try {
      const response = await axios.post("http://localhost:5000/api/classRoom", { ClassRoom: roomName });
      setClassRooms([...classRooms, response.data]);
      setRoomName(""); // Reset input field after adding
      toast.success("Classroom added successfully!"); // Toast for success
    } catch (error) {
      console.error("Error adding classroom:", error);
      toast.error("Failed to add classroom!"); // Toast for error
    }
  };

  // Delete classroom with confirmation
  const deleteClassRoom = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/classRoom/${currentActionId}`);
      setClassRooms(classRooms.filter((room) => room._id !== currentActionId)); // Remove from state
      toast.success("Classroom deleted successfully!"); // Toast for success
      setShowConfirmDelete(false); // Close confirmation
    } catch (error) {
      console.error("Error deleting classroom:", error);
      toast.error("Failed to delete classroom!"); // Toast for error
    }
  };

  // Edit classroom with confirmation
  const editClassRoom = async () => {
    if (!editRoomName) return; // Don't update if room name is empty

    try {
      const response = await axios.put(`http://localhost:5000/api/classRoom/${currentActionId}`, {
        ClassRoom: editRoomName,
      });
      setClassRooms(classRooms.map((room) => (room._id === currentActionId ? response.data : room)));
      setEditRoomId(null); // Reset editing state
      setEditRoomName(""); // Reset input field after saving
      toast.success("Classroom updated successfully!"); // Toast for success
      setShowConfirmSave(false); // Close save confirmation
    } catch (error) {
      console.error("Error updating classroom:", error);
      toast.error("Failed to update classroom!"); // Toast for error
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen mt-20">
      <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded">
        <h1 className="text-xl font-bold mb-4">Manage Classrooms</h1>

        {/* Add Classroom */}
        <div className="mb-6">
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter new classroom name"
            className="border p-2 rounded w-full mb-2"
          />
          <button
            onClick={addClassRoom}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto"
          >
            Add Classroom
          </button>
        </div>

        {/* Display Classrooms */}
        <ul className="space-y-4">
          {classRooms.map((room) => (
            <li key={room._id} className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm mb-4">
              {editRoomId === room._id ? (
                <div className="flex-grow">
                  <input
                    type="text"
                    value={editRoomName}
                    onChange={(e) => setEditRoomName(e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>
              ) : (
                <span>{room.ClassRoom}</span>
              )}
              <div className="flex space-x-2">
                {editRoomId === room._id ? (
                  <button
                    onClick={() => {
                      setActionType("save");
                      setCurrentActionId(room._id);
                      setShowConfirmSave(true); // Show save confirmation
                    }}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditRoomId(room._id);
                      setEditRoomName(room.ClassRoom);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => {
                    setActionType("delete");
                    setCurrentActionId(room._id);
                    setShowConfirmDelete(true); // Show delete confirmation
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Save Confirmation Popup */}
      {showConfirmSave && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h3 className="text-xl font-semibold">Are you sure you want to save the changes?</h3>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setShowConfirmSave(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={editClassRoom}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Confirm Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showConfirmDelete && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h3 className="text-xl font-semibold">Are you sure you want to delete this classroom?</h3>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={deleteClassRoom}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notifications */}
      <Toaster position="top-center" />
    </div>
  );
};

export default RoomsUpdate;
