import React, { useState, useEffect } from "react";
import axios from "axios";

const LabsDropdown = () => {
  const [selectedStaff, setSelectedStaff] = useState("");
  const [fileDetails, setFileDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [labRooms, setLabRooms] = useState([]);

  useEffect(() => {
    const fetchLabRooms = async () => {
      const response = await axios.get("https://time-table-viewer-t8n7.vercel.app/api/labrooms");
      setLabRooms(response.data);
    };
  
    fetchLabRooms();
  }, []);

  const handleChange = async (e) => {
    setSelectedStaff(e.target.value);
    await fetchFile(e.target.value);
  };

  const fetchFile = async (teacherName) => {
    if (!teacherName) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`https://time-table-viewer-t8n7.vercel.app/staff/file/${teacherName}`);
      if (response.data && response.data.file) {
        setFileDetails(response.data.file);
      } else {
        setFileDetails(null);
      }
    } catch (err) {
      setError("Error fetching the file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFileDetails(null);
    setSelectedStaff("");
  };

  const handleExpand = () => {
    if (fileDetails && fileDetails.url) {
      window.open(fileDetails.url, "_blank");
    }
  };

  return (
    <div className="bg-[#DDE5ED] pt-24 min-h-screen">
      <div className="w-full max-w-3xl mx-auto p-8 bg-[#FFFDF5] shadow-lg rounded-lg border border-[#F9A826]">
        <h1 className="text-2xl font-bold text-center text-[#3C4A3E] mb-6">
          Lab Room Timetable Viewer
        </h1>

        <label htmlFor="staff" className="block text-lg font-medium text-[#3C4A3E] mb-2">
          Select Lab Room
        </label>
        <select
          id="staff"
          name="staff"
          value={selectedStaff}
          onChange={handleChange}
          className="block w-full px-4 py-2 border border-[#F9A826] rounded-md shadow-sm focus:outline-none focus:ring-[#F9A826] focus:border-[#F9A826] text-[#3C4A3E] bg-[#FFFDF5] sm:text-lg"
        >
          <option value="">Choose a Lab Room...</option>
          {labRooms.map((room) => (
            <option key={room._id} value={room.roomName}>
              {room.roomName}
            </option>
          ))}
        </select>

        {loading && (
          <div className="mt-6 text-center text-[#3C4A3E] text-lg">Loading file...</div>
        )}

        {error && (
          <div className="mt-6 text-center text-red-500 text-lg">{error}</div>
        )}

        {fileDetails && !loading && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-[#3C4A3E] mb-4">
              File Details for {selectedStaff}
            </h3>

            <div className="flex justify-between items-center mb-4 p-4 bg-[#FFFDF5] rounded-md border border-[#F9A826] shadow-sm">
              <span className="text-lg font-medium text-[#3C4A3E]">PDF Actions</span>
              <div className="flex space-x-4">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md shadow"
                >
                  Close
                </button>
                <button
                  onClick={handleExpand}
                  className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md shadow"
                >
                  Expand
                </button>
              </div>
            </div>

            <div className="relative">
              <embed
                src={fileDetails.url} // Make sure this URL comes from Cloudinary or other proper storage
                width="100%"
                height="500px"
                type="application/pdf"
                className="border border-[#F9A826] rounded-lg shadow"
              />
            </div>
          </div>
        )}

        {!fileDetails && !loading && selectedStaff && (
          <div className="mt-6 text-center text-[#3C4A3E] text-lg">
            <p>No file found for {selectedStaff}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabsDropdown;
