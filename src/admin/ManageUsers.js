import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./ManageUsers.css";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetails, setUserDetails] = useState({ username: "", password: "" });
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Failed to load users.");
        setLoading(false);
      });
  }, []);

  const handleAddOrUpdateUser = () => {
    if (!userDetails.username || !userDetails.password) {
      alert("Both username and password are required.");
      return;
    }

    const hashedPassword = hashPassword(userDetails.password); // Hashing the password

    if (selectedUser) {
      // Update User
      fetch("http://localhost:8080/api/auth/register${selectedUser.id}`", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userDetails, password: hashedPassword }),
      })
        .then((response) => response.json())
        .then((data) => {
          setUsers(users.map((user) => (user.id === selectedUser.id ? data : user)));
          setSelectedUser(null);
          setUserDetails({ username: "", password: "" });
          setShowForm(false);
          alert("User updated successfully!");
        })
        .catch((error) => console.error("Error updating user:", error));
    } else {
      // Add New User
      fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userDetails, password: hashedPassword }),
      })
        .then((response) => response.json())
        .then((data) => {
          setUsers([...users, data]);
          setUserDetails({ username: "", password: "" });
          setShowForm(false);
          alert("User added successfully!");
        })
        .catch((error) => console.error("Error adding user:", error));
    }
  };

  const handleDeleteUser = (id) => {
    fetch(`http://localhost:8080/api/users/${id}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          setUsers(users.filter((user) => user.id !== id));
          alert("User deleted successfully!");
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setUserDetails({ username: user.username, password: "" }); // Set password to empty when editing
    setShowForm(true);
  };

  // Simple hash function (for demonstration purposes only)
  const hashPassword = (password) => {
    return password.split('').reverse().join(''); // You should use a real hashing algorithm like bcrypt
  };

  return (
    <div className="manage-users-container">
      <h2>MANAGE USERS</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          {/* Add New User Button */}
          <button
            className="add-user-btn"
            onClick={() => {
              setShowForm(!showForm);
              setSelectedUser(null);
              setUserDetails({ username: "", password: "" });
            }}
          >
            {showForm ? "Close Form" : selectedUser ? "Edit User" : "Add User"}
          </button>

          {/* Add or Edit User Form */}
          {showForm && (
            <div className="add-user-form">
              <input
                type="text"
                placeholder="Username"
                value={userDetails.username}
                onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
              />
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={userDetails.password}
                  onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                />
                {/* <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                /> */}
              </div>
              <button onClick={handleAddOrUpdateUser}>
                {selectedUser ? "Update User" : "Confirm Add"}
              </button>
            </div>
          )}

          {/* Users List */}
          <div className="users-list">
            {users.length === 0 ? (
              <p>No users found</p>
            ) : (
              users.map((user) => (
                <div key={user.id} className="user-card">
                  <h4>{user.username}</h4>
                  <button className="edit-btn" onClick={() => handleEditUser(user)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ManageUsers;
