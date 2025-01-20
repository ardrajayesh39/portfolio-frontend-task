import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Lottie from 'lottie-react';
import animationData from '../assets/animations/intro-animation.json';
import './About.css';

function About() {
  return (
    <section id="about">
      {/* Background Layer */}
      <div className="about-background"></div>

      {/* Content Layer */}
      <div className="about-content">
        {/* Flexbox container for title and animation */}
        <div className="about-header">
          <Lottie animationData={animationData} loop={true} className="animated-image" />
          <h2>ABOUT ME</h2>
        </div>

        <p>
          I am Ardra Jayesh, a B.Tech graduate in Electronics and Communication Engineering from Rajiv Gandhi Institute of Technology (RIT). Currently, I am working as an Associate Software Engineer at Tarento.
          <br />
          I am eager to learn and grow in software development. I have a strong interest in coding, problem-solving, and exploring new technologies. My passion lies in building efficient and user-friendly applications while continuously improving my skills.
        </p>
      </div>
    </section>
  );
}

export default About;