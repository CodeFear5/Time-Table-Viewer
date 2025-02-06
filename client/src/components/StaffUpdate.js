import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // Import React Hot Toast

const StaffUpdate = () => {
  const [staffName, setStaffName] = useState(""); // For adding new staff name
  const [staffNames, setStaffNames] = useState([]); // To store list of staff names
  const [editStaffId, setEditStaffId] = useState(null); // To track which staff name is being edited
  const [editStaffName, setEditStaffName] = useState(""); // For updating the staff name
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); // To show delete confirmation popup
  const [deleteId, setDeleteId] = useState(null); // To store the staff ID to delete
  const [showConfirmSave, setShowConfirmSave] = useState(false); // To show save confirmation popup
  const [staffIdToSave, setStaffIdToSave] = useState(null); // To store the ID of the staff to be saved

  // Fetch all staff names from the backend
  const fetchStaffNames = async () => {
    try {
      const response = await axios.get("https://time-table-viewer.onrender.com/api/staffnames");
      setStaffNames(response.data);
    } catch (error) {
      console.error("Error fetching staff names:", error);
    }
  };

  useEffect(() => {
    fetchStaffNames();
  }, []);

  // Add a new staff name
  const addStaffName = async () => {
    try {
      const response = await axios.post("https://time-table-viewer.onrender.com/api/staffnames", { staffName });
      setStaffNames([...staffNames, response.data]);
      setStaffName(""); // Reset the input field after adding
      toast.success("Staff name added successfully!"); // Success toast
    } catch (error) {
      console.error("Error adding staff name:", error);
      toast.error("Failed to add staff name"); // Error toast
    }
  };

  // Edit the staff name
  const editStaffNameHandler = (id) => {
    setStaffIdToSave(id); // Store the staff ID to be saved
    setShowConfirmSave(true); // Show the confirmation popup
  };

  const saveStaffName = async () => {
    try {
      const response = await axios.put(`https://time-table-viewer.onrender.com/api/staffnames/${staffIdToSave}`, {
        staffName: editStaffName,
      });
      setStaffNames(staffNames.map((staff) => (staff._id === staffIdToSave ? response.data : staff)));
      setEditStaffId(null); // Reset editing state
      setEditStaffName(""); // Clear the input field
      setShowConfirmSave(false); // Close the save confirmation popup
      toast.success("Staff name updated successfully!"); // Success toast
    } catch (error) {
      console.error("Error updating staff name:", error);
      toast.error("Failed to update staff name"); // Error toast
    }
  };

  // Delete the staff name
  const deleteStaffName = async () => {
    try {
      await axios.delete(`https://time-table-viewer.onrender.com/api/staffnames/${deleteId}`);
      setStaffNames(staffNames.filter((staff) => staff._id !== deleteId));
      setShowConfirmDelete(false); // Close delete confirmation
      setDeleteId(null);
      toast.success("Staff name deleted successfully!"); // Success toast
    } catch (error) {
      console.error("Error deleting staff name:", error);
      toast.error("Failed to delete staff name"); // Error toast
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen mt-20">
      <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded">
        <h1 className="text-xl font-bold mb-4 text-center md:text-left">Manage Staff Names</h1>

        {/* Add New Staff Name */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
          <input
            type="text"
            value={staffName}
            onChange={(e) => setStaffName(e.target.value)}
            placeholder="Enter new staff name"
            className="border p-2 rounded w-full md:w-2/3 mb-2 md:mb-0"
          />
          <button
            onClick={addStaffName}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 md:mt-0 md:ml-4 w-full md:w-auto"
          >
            Add Staff Name
          </button>
        </div>

        {/* Display Staff Names with Edit and Delete Options */}
        <ul className="space-y-4">
          {staffNames.map((staff) => (
            <li
              key={staff._id}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm mb-4"
            >
              {editStaffId === staff._id ? (
                <div className="flex-grow">
                  <input
                    type="text"
                    value={editStaffName}
                    onChange={(e) => setEditStaffName(e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>
              ) : (
                <span className="text-lg font-semibold">{staff.staffName}</span>
              )}
              <div className="flex space-x-2">
                {editStaffId === staff._id ? (
                  <button
                    onClick={() => editStaffNameHandler(staff._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditStaffId(staff._id);
                      setEditStaffName(staff.staffName);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => {
                    setDeleteId(staff._id);
                    setShowConfirmDelete(true);
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Confirmation Popup for Save */}
        {showConfirmSave && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-10">
            <div className="bg-white p-6 rounded shadow-lg text-center">
              <h3 className="text-xl font-semibold">Are you sure you want to save this change?</h3>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => setShowConfirmSave(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={saveStaffName}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Confirm Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Popup for Delete */}
        {showConfirmDelete && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-10">
            <div className="bg-white p-6 rounded shadow-lg text-center">
              <h3 className="text-xl font-semibold">Are you sure you want to delete?</h3>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteStaffName}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffUpdate;
