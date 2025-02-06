import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageEducation.css";

function ManageEducation() {
  const [education, setEducation] = useState([]);
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    year: "",
    percentage: "",
  });
  const [editingEducation, setEditingEducation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch education data from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/educations")
      .then((response) => {
        setEducation(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching education data:", error);
        setError("Failed to load education data.");
        setLoading(false);
      });
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    setNewEducation({ ...newEducation, [e.target.name]: e.target.value });
  };

  // Handle adding new education
  const handleAddEducation = () => {
    if (!newEducation.degree || !newEducation.institution || !newEducation.year || !newEducation.percentage) {
      alert("All fields are required!");
      return;
    }

    console.log("Adding Education:", newEducation); // Debugging log

    axios
      .post("http://localhost:8080/api/educations", newEducation)
      .then((response) => {
        console.log("Added Education:", response.data);
        setEducation([...education, response.data]); // Update UI
        setNewEducation({ degree: "", institution: "", year: "", percentage: "" });
        setShowAddForm(false);
        alert("Education added successfully!");
      })
      .catch((error) => {
        console.error("Error adding education:", error.response ? error.response.data : error);
        setError("Failed to add education.");
      });
  };

  // Handle updating education
  const handleUpdateEducation = () => {
    if (!editingEducation) return;

    console.log("Updating Education:", editingEducation); // Debugging log

    axios
      .put(`http://localhost:8080/api/educations/${editingEducation.id}`, editingEducation)
      .then((response) => {
        setEducation(education.map((item) => (item.id === editingEducation.id ? response.data : item)));
        setEditingEducation(null);
        alert("Education updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating education:", error.response ? error.response.data : error);
        setError("Failed to update education.");
      });
  };

  // Handle deleting education
  const handleDeleteEducation = (id) => {
    console.log("Deleting Education ID:", id); // Debugging log

    axios
      .delete(`http://localhost:8080/api/educations/${id}`)
      .then(() => {
        setEducation(education.filter((item) => item.id !== id));
        alert("Education deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting education:", error.response ? error.response.data : error);
        setError("Failed to delete education.");
      });
  };

  return (
    <div className="education-container">
      <h2>MANAGE EDUCATION</h2>

      {loading ? (
        <p>Loading education data...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          {/* Add New Education Button */}
          <button className="add-button" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? "Cancel" : "+ Add New Education"}
          </button>

          {/* Add Education Form */}
          {showAddForm && (
            <div className="form-container">
              <h3>Add Education</h3>
              <div className="form-grid">
                <input type="text" name="degree" placeholder="Degree" value={newEducation.degree} onChange={handleInputChange} />
                <input type="text" name="institution" placeholder="Institution" value={newEducation.institution} onChange={handleInputChange} />
                <input type="text" name="year" placeholder="Year" value={newEducation.year} onChange={handleInputChange} />
                <input type="text" name="percentage" placeholder="Percentage" value={newEducation.percentage} onChange={handleInputChange} />
              </div>
              <div className="action-buttons">
                <button onClick={handleAddEducation}>Save</button>
              </div>
            </div>
          )}

          {/* Education Table */}
          <div className="table-container">
            <table className="education-table">
              <thead>
                <tr>
                  <th>Degree</th>
                  <th>Institution</th>
                  <th>Year</th>
                  <th>Percentage</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {education.map((item) => (
                  <tr key={item.id}>
                    <td>{item.degree}</td>
                    <td>{item.institution}</td>
                    <td>{item.year}</td>
                    <td>{item.percentage}%</td>
                    <td>
                      <button className="edit-btn" onClick={() => setEditingEducation(item)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDeleteEducation(item.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit Education Form */}
          {editingEducation && (
            <div className="form-container">
              <h3>Edit Education</h3>
              <div className="form-grid">
                <input type="text" name="degree" placeholder="Degree" value={editingEducation.degree} onChange={(e) => setEditingEducation({ ...editingEducation, degree: e.target.value })} />
                <input type="text" name="institution" placeholder="Institution" value={editingEducation.institution} onChange={(e) => setEditingEducation({ ...editingEducation, institution: e.target.value })} />
                <input type="text" name="year" placeholder="Year" value={editingEducation.year} onChange={(e) => setEditingEducation({ ...editingEducation, year: e.target.value })} />
                <input type="text" name="percentage" placeholder="Percentage" value={editingEducation.percentage} onChange={(e) => setEditingEducation({ ...editingEducation, percentage: e.target.value })} />
              </div>
              <div className="action-buttons">
                <button onClick={handleUpdateEducation}>Update</button>
                <button onClick={() => setEditingEducation(null)}>Cancel</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ManageEducation;
