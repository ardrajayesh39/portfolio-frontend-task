import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import profileImage from '../assets/images/profile.jpg'; // Adjust the path to your profile image
import './About.css';

function About() {
  return (
    <section id="about">
      <div className="about-content">
        {/* Profile Image */}
        <div className="profile-container">
          <img
            src={profileImage}
            alt="Profile"
            className="profile-img"
          />
        </div>

        {/* Text Section */}
        <div className="text-container">
          <div className="hello-text">----hello</div>
          <div className="name-text">
            I'm <span className="highlight">Ardra </span> Jayesh
          <div className='intro'>I am Ardra Jayesh, a B.Tech graduate in Electronics and Communication Engineering from Rajiv Gandhi Institute of Technology (RIT). Currently, I am working as an Associate Software Engineer at Tarento.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
