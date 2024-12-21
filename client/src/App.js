import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import RoomsDropdown from "./components/RoomsDropdown";
import ClassDropdown from "./components/ClassDropdown";
import LabsDropdown from "./components/LabsDropdown";
import StaffDropdown from "./components/StaffDropdown";
import AdminPanel from "./components/AdminPanel";
import StaffUpload from "./components/StaffUpload";
import LabUpload from "./components/LabUpload";
import RoomUpload from "./components/RoomUpload";
import ClassTimetableUpload from "./components/classUpload";
 import LabRoomUpdate from "./components/LabRoomUpdate";
import StaffUpdate from "./components/StaffUpdate";
import RoomsUpdate from "./components/RoomsUpdate";
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterPage from "./components/RegisterPage";
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/header" element={<Header />} />

        {/* routes  do not require secure */}
        <Route path="/room" element={<RoomsDropdown />} />
        <Route path="/lab" element={<LabsDropdown />} />
        <Route path="/staff" element={<StaffDropdown />} />
        <Route path="/class" element={<ClassDropdown />} />
         <Route path="/register" element={<RegisterPage />} />

        {/* routes  which require security */}
        <Route path="/login" element={<LoginPage />} />

              {/* Secured Routes */}
      <Route
        path="/adminPanel"
        element={
          // <ProtectedRoute>
            <AdminPanel />
          // {/* </ProtectedRoute> */}
        }
      />
      <Route
        path="/upload/class"
        element={
          // <ProtectedRoute>
            <ClassTimetableUpload />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/staff/upload"
        element={
          // <ProtectedRoute>
            <StaffUpload />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/staff/update"
        element={
          // <ProtectedRoute>
            <StaffUpdate />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/upload/lab"
        element={
          // <ProtectedRoute>
            <LabUpload />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/lab/update"
        element={
          // <ProtectedRoute>
            <LabRoomUpdate />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/upload/room"
        element={
          // <ProtectedRoute>
            <RoomUpload />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/rooms/update"
        element={
          // <ProtectedRoute>
            <RoomsUpdate />
          // </ProtectedRoute>
        }
      />
      </Routes>
    </Router>
  );
};

export default App;