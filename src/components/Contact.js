import React from 'react';
import './Contact.css';
import { FaEnvelope, FaLinkedin, FaGithub, FaPhone } from 'react-icons/fa'; 
import Lottie from 'lottie-react';
import animationData from '../assets/animations/contact-animation.json';

function Contact() {
  const email = "ardrajayesh39@gmail.com";
  const subject = "Regarding My Portfolio";
  const body = "Hello, I have some questions regarding your portfolio...";

  return (
    <section id="contact">
      <div className="container py-5">
        <h2>CONTACT ME</h2>
        <p>Feel free to reach out to me through any of the following platforms:</p>
        <ul className="contact-list">
          <li>
            <FaEnvelope className="icon" />
            <a href={`mailto:${email}`}> Email: {email}</a>
          </li>
          <li>
            <FaLinkedin className="icon" />
            <a href="https://www.linkedin.com/in/ardra-jayesh" target="_blank" rel="noopener noreferrer">
              LinkedIn: https://www.linkedin.com/in/ardra-jayesh
            </a>
          </li>
          <li>
            <FaGithub className="icon" />
            <a href="https://github.com/ardrajayesh39" target="_blank" rel="noopener noreferrer">
              GitHub: https://github.com/ardrajayesh39
            </a>
          </li>
          <li>
            <FaPhone className="icon" /> Phone: +91 9495262774
          </li>
        </ul>

       
        <div className="email-section">
          <Lottie animationData={animationData} loop={true} className="animated-image" />
          <h3>Send Me an Email</h3>
        </div>

     
        <div className="button-container">
          <button
            className="btn btn-primary"
            onClick={() => {
              window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            }}
          >
            Click to Send a Message
          </button>
        </div>
      </div>
    </section>
  );
}

export default Contact;