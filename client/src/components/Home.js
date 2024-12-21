import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header'; // Importing the global Header component

const Home = () => {
  const currentYear = new Date().getFullYear(); // Dynamically get the current year

  return (
    <div className="bg-[#DDE5ED] min-h-screen flex flex-col">
      {/* Add a margin to offset the navbar */}
      <Header />
      <div className="flex-grow pt-20">
        <main className="max-w-7xl mx-auto p-6 sm:p-8">
          <h2 className="text-4xl font-semibold mb-12 text-center text-[#3C4A3E]">
            Welcome to Your Timetable
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card 1 */}
            <Link
              to="/staff"
              className="bg-[#FFFDF5] border border-[#F9A826] shadow-md rounded-lg hover:shadow-lg transform transition-all duration-300"
            >
              <div className="p-12 sm:p-16 text-center h-full">
                <h3 className="text-2xl font-semibold text-[#3C4A3E] mb-6">
                  Individual Staff Timetable
                </h3>
                <p className="text-[#6B7280] text-lg">
                  View and manage your lectures with ease.
                </p>
              </div>
            </Link>

            {/* Card 2 */}
            <Link
              to="/class"
              className="bg-[#FFFDF5] border border-[#F9A826] shadow-md rounded-lg hover:shadow-lg transform transition-all duration-300"
            >
              <div className="p-12 sm:p-16 text-center h-full">
                <h3 className="text-2xl font-semibold text-[#3C4A3E] mb-6">
                  SectionWise TimeTable
                </h3>
                <p className="text-[#6B7280] text-lg">
                  Organize and manage practical sessions effortlessly.
                </p>
              </div>
            </Link>

            {/* Card 3 */}
            <Link
              to="/lab"
              className="bg-[#FFFDF5] border border-[#F9A826] shadow-md rounded-lg hover:shadow-lg transform transition-all duration-300"
            >
              <div className="p-12 sm:p-16 text-center h-full">
                <h3 className="text-2xl font-semibold text-[#3C4A3E] mb-6">
                  Lab Timetable
                </h3>
                <p className="text-[#6B7280] text-lg">
                  Upload and monitor your lab schedules seamlessly.
                </p>
              </div>
            </Link>

            {/* Card 4 */}
            <Link
              to="/room"
              className="bg-[#FFFDF5] border border-[#F9A826] shadow-md rounded-lg hover:shadow-lg transform transition-all duration-300"
            >
              <div className="p-12 sm:p-16 text-center h-full">
                <h3 className="text-2xl font-semibold text-[#3C4A3E] mb-6">
                  ClassRoom Timetable
                </h3>
                <p className="text-[#6B7280] text-lg">
                  Manage room bookings and events efficiently.
                </p>
              </div>
            </Link>
          </div>
        </main>
      </div>

      {/* Footer */}
      {/* Footer */}
      <footer className="bg-[#465A65] text-white py-4">
        <div className="text-center text-sm">
          <div>
            Developed by <span className="font-semibold">Team Timeframe Innovators</span> | Copyright © {currentYear} <span className="font-semibold"></span>
          </div>
          <div className="mt-1">
            Under the guidance of <span className="font-semibold">Dr. Asha T</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
