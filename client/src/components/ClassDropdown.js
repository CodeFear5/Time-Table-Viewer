import React, { useState, useEffect } from "react";
import axios from "axios";

// JSON object for semester to section mapping
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

const ClassDropdown = () => {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [fileDetails, setFileDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
    setSelectedSection("");
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  const fetchFile = async () => {
    if (!selectedSemester || !selectedSection) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://time-table-viewer.onrender.com/class/file/${encodeURIComponent(selectedSemester)}/${encodeURIComponent(selectedSection)}`
      );
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

  useEffect(() => {
    fetchFile();
  }, [selectedSemester, selectedSection]);

  const handleClose = () => {
    setFileDetails(null);
    setSelectedSemester("");
    setSelectedSection("");
  };

  const handleExpand = () => {
    if (fileDetails && fileDetails.url) {
      window.open(fileDetails.url, "_blank");
    }
  };

  return (
    <div className="bg-[#DDE5ED] pt-24 min-h-screen">
      <div className="w-full max-w-3xl mx-auto p-8 bg-[#FFFDF5] shadow-lg rounded-lg border border-[#F9A826]">
        <h2 className="text-2xl font-bold text-center text-[#3C4A3E] mb-6">
          Class Timetable Viewer
        </h2>

        {/* Semester Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="semester"
            className="block text-lg font-medium text-[#3C4A3E] mb-2"
          >
            Select Semester
          </label>
          <select
            id="semester"
            name="semester"
            value={selectedSemester}
            onChange={handleSemesterChange}
            className="block w-full px-4 py-2 border border-[#F9A826] rounded-md shadow-sm focus:outline-none focus:ring-[#F9A826] focus:border-[#F9A826] text-[#3C4A3E] bg-[#FFFDF5] sm:text-lg"
          >
            <option value="">Choose a semester...</option>
            {Object.keys(semesterData).map((semester) => (
              <option key={semester} value={semester}>
                {semester}
              </option>
            ))}
          </select>
        </div>

        {/* Section Dropdown */}
        {selectedSemester && (
          <div className="mb-6">
            <label
              htmlFor="section"
              className="block text-lg font-medium text-[#3C4A3E] mb-2"
            >
              Select Section
            </label>
            <select
              id="section"
              name="section"
              value={selectedSection}
              onChange={handleSectionChange}
              className="block w-full px-4 py-2 border border-[#F9A826] rounded-md shadow-sm focus:outline-none focus:ring-[#F9A826] focus:border-[#F9A826] text-[#3C4A3E] bg-[#FFFDF5] sm:text-lg"
            >
              <option value="">Choose a section...</option>
              {semesterData[selectedSemester].map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Display loading or error messages */}
        {loading && (
          <div className="mt-4 text-center text-[#3C4A3E] text-lg">Loading file...</div>
        )}
        {error && (
          <div className="mt-4 text-center text-red-500 text-lg">{error}</div>
        )}

        {/* Display file details */}
        {fileDetails && !loading && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-[#3C4A3E] mb-4">Class File:</h3>

            <div className="flex justify-between items-center mb-4 p-4 bg-[#FFFDF5] rounded-md border border-[#F9A826] shadow-sm">
              <span className="text-lg font-medium text-[#3C4A3E]">PDF Options</span>
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
                src={fileDetails.url}
                width="100%"
                height="500px"
                type="application/pdf"
                className="border border-[#F9A826] rounded-lg shadow"
              />
            </div>
          </div>
        )}

        {/* No file found */}
        {!fileDetails && !loading && selectedSemester && selectedSection && (
          <div className="mt-4 text-center text-[#3C4A3E] text-lg">
            <p>No file found for the selected class.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassDropdown;
