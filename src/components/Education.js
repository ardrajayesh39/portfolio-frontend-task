import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Education.css'; // Update CSS filename for education if needed
import Lottie from 'lottie-react';
import animationData from '../assets/animations/education-animation.json';

const Education = () => {
  const [education, setEducation] = useState([]); // State to store education data
  const [selectedEducation, setSelectedEducation] = useState(null); // State for selected education entry
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  // Fetch data from the backend
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/educations') // Adjust the API endpoint
      .then((response) => {
        setEducation(response.data); // Update state with fetched data
        setLoading(false); // Set loading to false
      })
      .catch((err) => {
        setError('Failed to fetch education data. Please try again.'); // Handle error
        setLoading(false); // Set loading to false
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Show loading indicator
  if (loading) return <p>Loading...</p>;

  // Show error message if any
  if (error) return <p>{error}</p>;

  return (
    <section id="education" className="education-card-container">
      <div className="education-card">
        <div className="education-header">
          <div className="animated-icon">
            <Lottie animationData={animationData} loop={true} />
          </div>
          <h2 className="education-title">EDUCATION</h2>
        </div>

        {selectedEducation ? (
          // Detailed View of Selected Education Entry
          <div className="education-details">
            <h3>{selectedEducation.degree}</h3>
            <ul>
              <li><span className="icon">&#8226;</span> <strong>Institution:</strong> {selectedEducation.institution}</li>
              <li><span className="icon">&#8226;</span> <strong>Year:</strong> {selectedEducation.year}</li>
              <li><span className="icon">&#8226;</span> <strong>Percentage:</strong> {selectedEducation.percentage}%</li>
            </ul>
            <div className="text-center">
              <button
                className="btn btn-secondary mt-3"
                onClick={() => setSelectedEducation(null)}
              >
                Back to Education List
              </button>
            </div>
          </div>
        ) : (
          // List View of Education Entries
          <div className="education-list">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="education-item"
                onClick={() => setSelectedEducation(edu)} // Set the selected education entry on click
              >
                <h4>{edu.degree}</h4>
                <ul>
                  <li><span className="icon">&#8226;</span> {edu.institution}</li>
                  <li><span className="icon">&#8226;</span> <strong>Year:</strong> {edu.year}</li>
                  <li><span className="icon">&#8226;</span> <strong>Percentage:</strong> {edu.percentage}%</li>
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Education;
