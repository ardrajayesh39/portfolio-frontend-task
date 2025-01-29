import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Skills.css";
import Lottie from "lottie-react";
import animationData from "../assets/animations/skills-animation.json";
import { FaPython, FaHtml5, FaCss3Alt, FaDatabase } from "react-icons/fa";
import { FaGithub } from 'react-icons/fa';


const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section id="skills" className="container py-5">
      <div className="skills-header">
        <div className="animated-icon">
          <Lottie animationData={animationData} loop={true} />
        </div>
        <h2 className="skills-title">SKILLS</h2>
      </div>
      {selectedSkill ? (
        <div className="skill-details">
          <h3>{selectedSkill.name}</h3>
          <div className="text-center">
            <button
              className="btn btn-secondary mt-3"
              onClick={() => setSelectedSkill(null)}
            >
              Back to Skills List
            </button>
          </div>
        </div>
      ) : (
        <div className="skills-grid">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="skill-card"
              onClick={() => setSelectedSkill(skill)}
            >
              <h4>{skill.name}</h4>
              {/* Display icons for each skill */}
              <div className="skill-icon">
                {skill.name === "Python" && (
                  <FaPython style={{ color: "#3776AB", fontSize: "2rem" }} />
                )}
                {skill.name === "PostgreSQL" && (
                  <FaDatabase style={{ color: "#336791", fontSize: "2rem" }} />
                )}

                {skill.name === "GIT" && (
                 <FaGithub style={{ color: "#f1502f", fontSize: "2rem" }} />
                )}
                
                {skill.name === "HTML & CSS" && (
                  <div className="skill-icons">
                    <FaHtml5 style={{ color: "#E34F26", fontSize: "2rem" }} />
                    <FaCss3Alt
                      style={{
                        color: "#1572B6",
                        fontSize: "2rem",
                        marginLeft: "8px",
                      }}
                      
                    />
                    
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Skills;
