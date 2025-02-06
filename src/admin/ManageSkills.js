import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageSkills.css";

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [editingSkill, setEditingSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch skills from the backend
  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = () => {
    axios
      .get("http://localhost:8080/api/skills")
      .then((response) => {
        setSkills(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch skills. Please try again.");
        setLoading(false);
      });
  };

  // Add a new skill
  const addSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;

    axios
      .post("http://localhost:8080/api/skills", { name: newSkill })
      .then(() => {
        setNewSkill("");
        fetchSkills();
      })
      .catch(() => setError("Failed to add skill."));
  };

  // Edit a skill
  const editSkill = (e) => {
    e.preventDefault();
    if (!editingSkill.name.trim()) return;

    axios
      .put(`http://localhost:8080/api/skills/${editingSkill.id}`, {
        name: editingSkill.name,
      })
      .then(() => {
        setEditingSkill(null);
        fetchSkills();
      })
      .catch(() => setError("Failed to update skill."));
  };

  // Delete a skill
  const deleteSkill = (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      axios
        .delete(`http://localhost:8080/api/skills/${id}`)
        .then(() => fetchSkills())
        .catch(() => setError("Failed to delete skill."));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h2>Manage Skills</h2>

      {/* Add Skill Form */}
      <form onSubmit={editingSkill ? editSkill : addSkill}>
        <input
          type="text"
          placeholder="Enter skill name"
          value={editingSkill ? editingSkill.name : newSkill}
          onChange={(e) =>
            editingSkill
              ? setEditingSkill({ ...editingSkill, name: e.target.value })
              : setNewSkill(e.target.value)
          }
        />
        <button type="submit">
          {editingSkill ? "Update Skill" : "Add Skill"}
        </button>
        {editingSkill && (
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setEditingSkill(null)}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Skills Table */}
      <div className="table-container">
        <table className="skills-table">
          <thead>
            <tr>
              <th>Skill Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id}>
                <td>{skill.name}</td>
                <td className="action-buttons">
                  <button onClick={() => setEditingSkill(skill)}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteSkill(skill.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSkills;
