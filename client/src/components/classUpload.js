import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const semesterData = {
  "Semester 1": ["1E", "1F", "1G"],
  "Semester 2": ["2A", "2B", "2C"],
  "Semester 3": ["3A", "3B", "3C"],
  "Semester 4": ["4A", "4B", "4C"],
  "Semester 5": ["5A", "5B"],
  "Semester 6": ["6A", "6B", "6C"],
  "Semester 7": ["7A", "7B"],
  "Semester 8": ["8A", "8B", "8C"],
};

const ClassUpload = () => {
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [fileExists, setFileExists] = useState(false);

  useEffect(() => {
    const checkFileExistence = async () => {
      if (selectedSemester && selectedSection) {
        try {
          const response = await axios.get(
            `http://localhost:5000/class/check-file/${encodeURIComponent(selectedSemester.label)}/${encodeURIComponent(selectedSection.label)}`
          );
          setFileExists(response.data.exists);
        } catch (error) {
          console.error("Error checking file existence:", error);
          setMessage("Error checking file existence.");
        }
      }
    };

    checkFileExistence();
  }, [selectedSemester, selectedSection]);

  const handleSemesterChange = (selectedOption) => {
    setSelectedSemester(selectedOption);
    setSelectedSection(null);
    setFileExists(false);
    setMessage("");
  };

  const handleSectionChange = (selectedOption) => {
    setSelectedSection(selectedOption);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSemester || !selectedSection || !file) {
      setMessage("Please select a semester, section, and upload a file.");
      return;
    }

    if (fileExists) {
      setMessage("File already exists for this semester and section.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("semester", selectedSemester.label);
    formData.append("section", selectedSection.label);
    formData.append("file", file);
    formData.append("category", "timetable");

    try {
      const response = await axios.post("http://localhost:5000/class/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      setMessage(response.data.message);
      setFileExists(false);
      setFile(null);
    } catch (error) {
      setLoading(false);
      console.error("Error uploading file:", error);
      setMessage("Error uploading file. Please try again.");
    }
  };

  const semesterOptions = Object.keys(semesterData).map((semester) => ({
    value: semester,
    label: semester,
  }));

  const sectionOptions = selectedSemester
    ? semesterData[selectedSemester.label].map((section) => ({
        value: section,
        label: section,
      }))
    : [];

  return (
    <div className="bg-[#DDE5ED] min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-[#FFFDF5] p-8 rounded-lg shadow-lg w-full max-w-md border border-[#F9A826]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#3C4A3E]">
          Upload File for Class
        </h2>

        {message && (
          <div className="mb-4 text-center text-sm font-medium text-[#6B7280]">
            {message}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="semester" className="block text-lg font-medium text-[#3C4A3E] mb-2">
            Select Semester:
          </label>
          <Select
            id="semester"
            options={semesterOptions}
            value={selectedSemester}
            onChange={handleSemesterChange}
            placeholder="Select a semester..."
            className="mt-1 block w-full rounded-md shadow-sm text-[#3C4A3E]"
          />
        </div>

        {selectedSemester && (
          <div className="mb-4">
            <label htmlFor="section" className="block text-lg font-medium text-[#3C4A3E] mb-2">
              Select Section:
            </label>
            <Select
              id="section"
              options={sectionOptions}
              value={selectedSection}
              onChange={handleSectionChange}
              placeholder="Select a section..."
              className="mt-1 block w-full rounded-md shadow-sm text-[#3C4A3E]"
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="file" className="block text-lg font-medium text-[#3C4A3E] mb-2">
            Upload Timetable File:
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="block w-full px-4 py-2 border border-[#F9A826] rounded-md shadow-sm focus:outline-none focus:ring-[#F9A826] focus:border-[#F9A826] bg-[#FFFDF5] text-[#3C4A3E]"
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md text-white ${
              loading ? "bg-gray-400" : "bg-green-500"
            } hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload File"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClassUpload;
