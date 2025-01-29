import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Projects.css'; // Import your styles
import Lottie from 'lottie-react';
import animationData from '../assets/animations/project-animation.json';

// Import placeholder image for missing project images
import placeholderImage from '../assets/images/project1.jpg';

const Projects = () => {
  const [projects, setProjects] = useState([]); // State to store projects
  const [selectedProject, setSelectedProject] = useState(null); // State for selected project
  const [error, setError] = useState(null); // State for error handling

  // Fetch data from the backend
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/projects') // Replace with your API endpoint
      .then((response) => {
        setProjects(response.data); // Update state with fetched data
      })
      .catch((err) => {
        setError('Failed to fetch projects. Please try again later.'); // Handle error
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Function to handle image errors and set fallback image
  const handleImageError = (e) => {
    e.target.src = placeholderImage; // Set fallback image
  };

  return (
    <section id="projects" className="container py-5">
      <div className="projects-header text-center">
        <div className="d-flex align-items-center justify-content-center">
          <div className="animated-icon me-3">
            <Lottie animationData={animationData} loop={true} />
          </div>
          <h2 className="projects-title">PROJECTS</h2>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      {selectedProject ? (
        // Detailed View of Selected Project
        <div className="project-details">
          <h3>{selectedProject.title}</h3>
          <p>{selectedProject.description}</p>
          {/* Display the image for the selected project */}
          <img
            src={`data:image/jpeg;base64,${selectedProject.image}`} // Handle dynamic image from backend
            alt={selectedProject.title}
            className="project-img mb-3"
            onError={handleImageError} // Fallback to placeholder image
          />
          <div className="text-center">
            <button
              className="btn btn-secondary mt-3"
              onClick={() => setSelectedProject(null)}
            >
              Back to Project List
            </button>
          </div>
        </div>
      ) : (
        // Grid View of Titles with Images
        <div className="projects-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-title-card"
              onClick={() => setSelectedProject(project)} // Set the selected project on click
              role="button"
              tabIndex="0"
              onKeyPress={(e) => e.key === 'Enter' && setSelectedProject(project)} // Handle keyboard navigation
              aria-label={`View project: ${project.title}`} // Accessibility enhancement
            >
              <img
                src={`data:image/jpeg;base64,${project.image}`} // Handle dynamic image from backend
                alt={project.title}
                className="project-thumbnail"
                onError={handleImageError} // Fallback to placeholder image
              />
              <h4>{project.title}</h4>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
