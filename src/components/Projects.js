import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Projects.css'; // Import your styles
import Lottie from 'lottie-react';
import animationData from '../assets/animations/project-animation.json';

// Import images
import project1Image from '../assets/images/project1.jpg';
import project2Image from '../assets/images/project2.jpg';

const Projects = () => {
  const [projects, setProjects] = useState([]); // State to store projects
  const [selectedProject, setSelectedProject] = useState(null); // State for selected project
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  // Images for projects (mapping project IDs or indices to images)
  const projectImages = [project1Image, project2Image];
  // Fetch data from the backend
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/projects') 
      .then((response) => {
        setProjects(response.data); // Update state with fetched data
        setLoading(false); // Set loading to false
      })
      .catch((err) => {
        setError('Failed to fetch projects. Please try again.'); // Handle error
        setLoading(false); // Set loading to false
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Show loading indicator
  if (loading) return <p>Loading...</p>;

  // Show error message if any
  if (error) return <p>{error}</p>;

  return (
    <section id="projects" className="container py-5">
      <div className="projects-header">
        
        <div className="animated-icon">
          <Lottie animationData={animationData} loop={true} />
        </div>
        <h2 className="projects-title">PROJECTS</h2>
      </div>
      {selectedProject ? (
        // Detailed View of Selected Project
        <div className="project-details">
          <h3>{selectedProject.title}</h3>
          <p>{selectedProject.description}</p>
          {/* Display the image for the selected project */}
          <img
            src={projectImages[selectedProject.id - 1]} // Assuming `id` starts from 1
            alt={selectedProject.title}
            className="project-img mb-3"
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
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-title-card"
              onClick={() => setSelectedProject(project)} // Set the selected project on click
            >
              <img
                src={projectImages[index]} // Match image with project index
                alt={project.title}
                className="project-thumbnail"
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