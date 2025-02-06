import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ManageEducation from "./ManageEducation";
import ManageSkills from "./ManageSkills";
import ManageProjects from "./ManageProjects";
import ManageUsers from "./ManageUsers";
import "./Admin.css";

function AdminPanel() {
  const [selectedOption, setSelectedOption] = useState("education"); // Default selected option
  const navigate = useNavigate(); // Hook for navigating to login page
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State for checking authentication

  // Check for authentication token when component mounts
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      setIsAuthenticated(true); // Set authenticated state
    }

    // Retrieve selected option from localStorage (if exists)
    const storedOption = localStorage.getItem("selectedOption");
    if (storedOption) {
      setSelectedOption(storedOption);
    }
  }, [navigate]);

  const handleClick = (option) => {
    setSelectedOption(option);
    localStorage.setItem("selectedOption", option); // Store selected option in localStorage
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove the auth token from local storage
    localStorage.removeItem("selectedOption"); // Remove the stored selected option on logout
    navigate("/login"); // Redirect to login page after logout
  };

  if (!isAuthenticated) {
    return null; // Don't render the Admin Panel until authenticated
  }

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">ADMIN PANEL</h2>
        <button
          className={selectedOption === "education" ? "active" : ""}
          onClick={() => handleClick("education")}
        >
          Manage Education
        {/* </button>
        <button
          className={selectedOption === "skills" ? "active" : ""}
          onClick={() => handleClick("skills")}
        >
          Manage Skills */}


        </button>
        <button
          className={selectedOption === "projects" ? "active" : ""}
          onClick={() => handleClick("projects")}
        >
          Manage Projects
          
        </button>
        <button
          className={selectedOption === "users" ? "active" : ""}
          onClick={() => handleClick("users")}
        >
          Manage Users
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Content Area */}
      <div className="content">
        {selectedOption === "education" && <ManageEducation />}
        {selectedOption === "projects" && <ManageProjects />}
        {selectedOption === "users" && <ManageUsers />}
        {selectedOption === "skills" && <ManageSkills />}
      </div>
    </div>
  );
}

export default AdminPanel;
