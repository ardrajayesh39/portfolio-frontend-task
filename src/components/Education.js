import React from 'react';
import './Education.css';
import Lottie from 'lottie-react';
import animationData from '../assets/animations/education-animation.json';

function Education() {
  return (
    <section id="education">
      <div className="container py-5">
        <div className="education-header">
          <Lottie animationData={animationData} loop={true} className="animated-image" />
          <h2>EDUCATION</h2>
        </div>
        <ul>
          <li>
            <h4>Bachelor of Technology in Electronics and Communication Engineering</h4>
            <p><strong>Institution:</strong> Rajiv Gandhi Institute of Technology (RIT), Kottayam</p>
            <p><strong>Year:</strong> 2020 - 2024</p>
            <p><strong>CGPA:</strong> 9.15</p>
          </li>
          <li>
            <h4>Higher Secondary (12th)</h4>
            <p><strong>Institution:</strong> Bharatiya Vidya Bhavans Vidya Mandir</p>
            <p><strong>Year:</strong> 2019</p>
            <p><strong>Percentage:</strong> 86%</p>
          </li>
          <li>
            <h4>Secondary (10th)</h4>
            <p><strong>Institution:</strong> Bharatiya Vidya Bhavans Vidya Mandir</p>
            <p><strong>Year:</strong> 2017</p>
            <p><strong>Percentage:</strong> 95%</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Education;