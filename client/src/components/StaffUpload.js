import React, { useState, useEffect } from "react";
import Select from "react-select"; // Import the react-select library
import axios from "axios"; // Import Axios for making HTTP requests

const StaffUpload = () => {
  const [teacherData, setTeacherData] = useState([]); // Store teacher names fetched from backend
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // Store string message
  const [fileExists, setFileExists] = useState(false); // Track if the file exists
  const [existingFile, setExistingFile] = useState(null); // Store existing file details

  // Fetch teacher names from backend
  useEffect(() => {
    const fetchTeacherNames = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/staffnames");
        const teachers = response.data.map((teacher) => ({
          value: teacher.staffName,
          label: teacher.staffName,
        }));
        setTeacherData(teachers);
      } catch (error) {
        console.error("Error fetching staff names:", error);
        setMessage("Error fetching staff names.");
      }
    };
    
    fetchTeacherNames();
  }, []);

  // Check if the file already exists when teacher is selected
  useEffect(() => {
    if (selectedTeacher) {
      checkIfFileExists(selectedTeacher.label);
    }
  }, [selectedTeacher]);

  // Check if the file exists for the selected teacher
  const checkIfFileExists = async (teacherName) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/staff/check-file/${teacherName}`
      );
      if (response.data.exists) {
        setFileExists(true);
        setExistingFile(response.data.file); // Save the existing file details
        setMessage(`File already exists for ${teacherName}. You can edit it.`);
      } else {
        setFileExists(false);
        setExistingFile(null);
        setMessage(""); // Clear the message if no file exists
      }
    } catch (error) {
      console.error("Error checking file:", error);
      setMessage("Error checking file.");
    }
  };

  const handleTeacherChange = (selectedOption) => {
    setSelectedTeacher(selectedOption);
    setFileExists(false); // Reset file existence state when changing teacher
    setMessage(""); // Clear previous messages
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTeacher || !file) {
      setMessage("Please select a teacher and upload a file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("teacherName", selectedTeacher.label); // Send teacher name
    formData.append("file", file); // Send the file
    formData.append("category", "Staff"); // Hardcode 'Staff' as the category

    try {
      // If file exists, we update it
      const url = fileExists
        ? `http://localhost:5000/staff/edit/${existingFile._id}`
        : `http://localhost:5000/staff/upload`;

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      setMessage(response.data.message); // Use only the message string
      setFileExists(false); // Reset after upload
      setFile(null); // Clear the file input after upload
      setExistingFile(null); // Clear existing file details
    } catch (error) {
      setLoading(false);
      console.error("Error uploading file:", error);
      setMessage("Error uploading file. Please try again.");
    }
  };

  return (
    <div className="bg-[#DDE5ED] min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-[#FFFDF5] p-8 rounded-lg shadow-lg w-full max-w-md border border-[#F9A826]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#3C4A3E]">
          Upload or Edit File for Teacher
        </h2>

        {message && (
          <div className="mb-4 text-center text-sm font-medium text-[#6B7280]">
            {message}
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="teacher"
            className="block text-lg font-medium text-[#3C4A3E] mb-2"
          >
            Select Teacher:
          </label>
          <Select
            id="teacher"
            options={teacherData}
            value={selectedTeacher}
            onChange={handleTeacherChange}
            placeholder="Search for a teacher..."
            className="mt-1 block w-full rounded-md shadow-sm text-[#3C4A3E]"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="file"
            className="block text-lg font-medium text-[#3C4A3E] mb-2"
          >
            Upload File:
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="block w-full px-4 py-2 border border-[#F9A826] rounded-md shadow-sm focus:outline-none focus:ring-[#F9A826] focus:border-[#F9A826] bg-[#FFFDF5] text-[#3C4A3E]"
          />
        </div>

        {fileExists && (
          <div className="mb-4 text-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              {loading ? "Editing..." : "Edit Existing File"}
            </button>
          </div>
        )}

        {!fileExists && (
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        )}
      </form>
    </div>
  );
};

export default StaffUpload;
