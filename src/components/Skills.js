import React from 'react';
import './Skills.css'; 
import Lottie from 'lottie-react';
import animationData from '../assets/animations/skills-animation.json';

const Skills = () => {
  return (
    <section id="skills" className="container py-5">
      <div className="skills-header">
        {/* Smaller animation next to title */}
        <div className="animated-icon">
          <Lottie animationData={animationData} loop={true} />
        </div>
        <h2 className="skills-title">SKILLS</h2>
      </div>
      <div className="skills-icons">
        <div className="skill-icon">
          <i className="fab fa-html5" title="HTML & CSS"></i>
          <p>HTML & CSS</p>
        </div>
        <div className="skill-icon">
          <i className="fab fa-python" title="Python"></i>
          <p>Python</p>
        </div>
        <div className="skill-icon">
          <i className="fas fa-database" title="PostgreSQL"></i>
          <p>PostgreSQL</p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
