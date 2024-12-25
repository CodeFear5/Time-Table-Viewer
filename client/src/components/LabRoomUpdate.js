import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const LabRoomUpdate = () => {
  const [roomName, setRoomName] = useState("");
  const [labRooms, setLabRooms] = useState([]);
  const [editRoomId, setEditRoomId] = useState(null);
  const [editRoomName, setEditRoomName] = useState("");
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [roomToSave, setRoomToSave] = useState(null);

  // Fetch lab rooms
  const fetchLabRooms = async () => {
    try {
      const response = await axios.get("https://time-table-viewer-t8n7.vercel.app/api/labrooms");
      setLabRooms(response.data);
    } catch (error) {
      console.error("Error fetching lab rooms:", error);
      toast.error("Failed to load lab rooms");
    }
  };

  useEffect(() => {
    fetchLabRooms();
  }, []);

  // Add new lab room
  const addLabRoom = async () => {
    if (!roomName) {
      toast.error("Room name cannot be empty!");
      return;
    }
    try {
      const response = await axios.post("https://time-table-viewer-t8n7.vercel.app/api/labrooms", { roomName });
      setLabRooms([...labRooms, response.data]);
      setRoomName("");
      toast.success("Lab room added successfully");
    } catch (error) {
      console.error("Error adding lab room:", error);
      toast.error("Failed to add lab room");
    }
  };

// Delete lab room
const deleteLabRoom = async () => {
  if (!roomToDelete) return;
  toast.custom((t) => (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-md p-4 rounded border  mt-60 ${
        t.visible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
    >
      <p className="mb-4">Are you sure you want to delete this room?</p>
      <div className="flex justify-around mt-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={async () => {
            toast.dismiss(t.id); // Close the toast immediately
            try {
              await axios.delete(`https://time-table-viewer-t8n7.vercel.app/api/labrooms/${roomToDelete}`);
              setLabRooms(labRooms.filter((room) => room._id !== roomToDelete));
              toast.success("Lab room deleted successfully");
            } catch (error) {
              console.error("Error deleting lab room:", error);
              toast.error("Failed to delete lab room");
            }
          }}
        >
          Yes
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => toast.dismiss(t.id)} // Close the toast immediately
        >
          No
        </button>
      </div>
    </div>
  ));
};

// Edit lab room
const editLabRoom = async () => {
  if (!editRoomName || !roomToSave) return;
  toast.custom((t) => (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-md p-4 rounded border mt-60 ${
        t.visible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
    >
      <p className="mb-4">Are you sure you want to save changes to this room?</p>
      <div className="flex justify-around mt-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={async () => {
            toast.dismiss(t.id); // Close the toast immediately
            try {
              await axios.put(`https://time-table-viewer-t8n7.vercel.app/api/labrooms/${roomToSave}`, {
                roomName: editRoomName,
              });
              setLabRooms(
                labRooms.map((room) =>
                  room._id === roomToSave ? { ...room, roomName: editRoomName } : room
                )
              );
              toast.success("Lab room updated successfully");
            } catch (error) {
              console.error("Error updating lab room:", error);
              toast.error("Failed to update lab room");
            }
          }}
        >
          Yes
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => toast.dismiss(t.id)} // Close the toast immediately
        >
          No
        </button>
      </div>
    </div>
  ));
};


  return (
    <div className="p-4 sm:p-8 bg-gray-100 min-h-screen mt-20">
      <div className="max-w-3xl mx-auto bg-white p-4 sm:p-6 shadow rounded">
        <h1 className="text-lg sm:text-xl font-bold mb-4">Manage Lab Rooms</h1>

        {/* Add Lab Room */}
        <div className="mb-6">
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter new lab room"
            className="border p-2 rounded w-full mb-2"
          />
          <button
            onClick={addLabRoom}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Add Lab Room
          </button>
        </div>

        {/* Display Lab Rooms */}
        <ul className="space-y-4">
          {labRooms.map((room) => (
            <li key={room._id} className="flex items-center justify-between flex-wrap">
              {editRoomId === room._id ? (
                <input
                  type="text"
                  value={editRoomName}
                  onChange={(e) => setEditRoomName(e.target.value)}
                  className="border p-2 rounded flex-grow"
                />
              ) : (
                <span className="flex-grow">{room.roomName}</span>
              )}
              <div className="flex space-x-2 mt-2 sm:mt-0">
                {editRoomId === room._id ? (
                  <button
                    onClick={() => {
                      setRoomToSave(room._id);
                      editLabRoom();
                    }}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditRoomId(room._id);
                      setEditRoomName(room.roomName);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => {
                    setRoomToDelete(room._id);
                    deleteLabRoom();
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

      <Toaster />
    </div>
  );
};

export default LabRoomUpdate;
