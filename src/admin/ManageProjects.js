import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageProjects.css"; // Import CSS

function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: "", description: "", image: null });
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false); // State to toggle form visibility

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/projects")
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects.");
        setLoading(false);
      });
  }, []);

  const handleAddProject = () => {
    if (!newProject.title.trim() || !newProject.description.trim()) {
      alert("Title and Description cannot be empty!");
      return;
    }

    const formData = new FormData();
    formData.append("title", newProject.title);
    formData.append("description", newProject.description);
    formData.append("image", newProject.image);

    axios
      .post("http://localhost:8080/api/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setProjects([...projects, response.data]);
        setNewProject({ title: "", description: "", image: null });
        setShowAddForm(false); // Hide form after adding project
        alert("Project added successfully!");
      })
      .catch((error) => {
        console.error("Error adding project:", error.response?.data || error.message);
        setError("Failed to add project.");
      });
  };

  const handleUpdateProject = (id) => {
    if (!editingProject.title.trim() || !editingProject.description.trim()) {
      alert("Title and Description cannot be empty!");
      return;
    }

    const formData = new FormData();
    formData.append("title", editingProject.title);
    formData.append("description", editingProject.description);

    if (editingProject.image instanceof File) {
      formData.append("image", editingProject.image);
    }

    axios
      .put(`http://localhost:8080/api/projects/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setProjects(projects.map((project) => (project.id === id ? response.data : project)));
        setEditingProject(null);
        alert("Project updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating project:", error.response?.data || error.message);
        setError("Failed to update project.");
      });
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      axios
        .delete(`http://localhost:8080/api/projects/${id}`)
        .then(() => {
          setProjects(projects.filter((project) => project.id !== id));
          alert("Project deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting project:", error.response?.data || error.message);
          setError("Failed to delete project.");
        });
    }
  };

  return (
    <div className="container">
      <h2>MANAGE PROJECTS</h2>

      {loading ? (
        <p>Loading projects...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          {/* Button to Show Add Project Form */}
          <button onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? "Cancel" : "Add New Project"}
          </button>

          {/* Add Project Form (Visible Only When Button is Clicked) */}
          {showAddForm && (
            <div className="add-project-form">
              <h3> + Add New Project</h3>
              <form>
                <input
                  type="text"
                  placeholder="Project Title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                />
                <textarea
                  placeholder="Project Description"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({ ...newProject, description: e.target.value })
                  }
                  rows="3"
                />
                <input
                  type="file"
                  onChange={(e) => setNewProject({ ...newProject, image: e.target.files[0] })}
                />
                <button type="button" onClick={handleAddProject}>
                  Add Project
                </button>
              </form>
            </div>
          )}

          {/* Existing Projects */}
          <h3>PROJECTS</h3>
          <table className="project-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="4">No projects available.</td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id}>
                    {editingProject?.id === project.id ? (
                      <>
                        <td>
                          <input
                            type="text"
                            value={editingProject.title}
                            onChange={(e) =>
                              setEditingProject({ ...editingProject, title: e.target.value })
                            }
                          />
                        </td>
                        <td>
                          <textarea
                            value={editingProject.description}
                            onChange={(e) =>
                              setEditingProject({
                                ...editingProject,
                                description: e.target.value,
                              })
                            }
                            rows="3"
                          />
                        </td>
                        <td>
                          {project.image && (
                            <img
                              src={`data:image/jpeg;base64,${project.image}`}
                              alt={project.title}
                              style={{ width: "100px", height: "100px" }}
                            />
                          )}
                          <input
                            type="file"
                            onChange={(e) =>
                              setEditingProject({ ...editingProject, image: e.target.files[0] })
                            }
                          />
                        </td>
                        <td className="action-buttons">
                          <button onClick={() => handleUpdateProject(project.id)}>Save</button>
                          <button onClick={() => setEditingProject(null)}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{project.title}</td>
                        <td>{project.description}</td>
                        <td>
                          {project.image && (
                            <img
                              src={`data:image/jpeg;base64,${project.image}`}
                              alt={project.title}
                              style={{ width: "100px", height: "100px" }}
                            />
                          )}
                        </td>
                        <td className="action-buttons">
                          <button onClick={() => setEditingProject(project)}>Edit</button>
                          <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default ManageProjects;
