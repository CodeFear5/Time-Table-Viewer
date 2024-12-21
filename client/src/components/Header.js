import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

const Header = () => {
  const location = useLocation(); // Hook to get current location/path
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Check if the current page is the Admin page
  const isAdminPage = location.pathname === '/adminPanel';

  return (
    <header className="fixed top-0 left-0 w-full bg-[#465A65] text-white shadow-lg z-10">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Title with Typewriter Effect as a clickable link */}
        <Link to="/" className="text-2xl font-bold text-[#FAF3E0]">
          <Typewriter
            options={{
              strings: ['My Timetable App', 'Organize Your Day', 'Stay Productive'],
              autoStart: true,
              loop: true,
              delay: 75,
            }}
          />
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                className="text-[#FAF3E0] hover:text-[#FFD54F] transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-[#FAF3E0] hover:text-[#FFD54F] transition-colors"
              >
                Admin
              </Link>
            </li>

            {/* Conditional Rendering of Dropdown for Admin Page */}
            {isAdminPage && (
              <li className="relative">
                <button
                  onClick={toggleDropdown}
                  className="text-[#FAF3E0] hover:text-[#FFD54F] transition-colors"
                >
                  Update Database
                </button>
                {isDropdownOpen && (
                  <ul className="absolute right-0 mt-2 bg-[#FFFDF5] text-[#3C4A3E] shadow-lg rounded-lg w-48">
                    <li>
                      <Link
                        to="/staff/update"
                        className="block px-4 py-2 text-sm hover:bg-[#F9A826] transition-colors"
                      >
                        Update Staff Names
                      </Link>
                    </li>
                  
                    <li>
                      <Link
                        to="/lab/update"
                        className="block px-4 py-2 text-sm hover:bg-[#F9A826] transition-colors"
                      >
                        Update Lab Rooms Data
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/rooms/update"
                        className="block px-4 py-2 text-sm hover:bg-[#F9A826] transition-colors"
                      >
                        Update ClassRooms data
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
