import { useState } from "react";
import {  Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UpdateProfile from "./components/UpdateProfile";
import RecruiterDashboard from "./pages/RecruiterDashboard";

const App = () => {
  // Load user from localStorage so refresh doesn't log you out
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Save user to localStorage when it changes
  const handleSetUser = (userData) => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
    setUser(userData);
  };

  return (

      <Routes>
        <Route path="/" element={user ? <Home user={user} setUser={handleSetUser} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setUser={handleSetUser} />} />
        <Route path="/profile" element={<UpdateProfile />} />
        {/* Recruiter */}
        <Route path="/admin/dashboard" element={user?.role === "recruiter" ? <RecruiterDashboard user={user} setUser={handleSetUser} /> : <Navigate to="/login" />} />
      </Routes>

  );
};

export default App;