import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Education from './components/Education';
import Skills from './components/Skills'; 


import profileImage from './assets/images/profile.jpg'; // Correct path to the profile image

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="page-container">
          {/* Left Section: Portfolio and Intro */}
          <div className="left-section">
            <h1 className="text-center text-dark">Portfolio</h1>
            <p className="text-center text-dark">
              Welcome to my portfolio! You can navigate through the sections above.
            </p>
            {/* Profile Image */}
            <div className="profile-container">
              <img
                src={profileImage}
                alt="Profile"
                className="profile-img"
              />
            </div>
          </div>

          {/* Decorative Background */}
          <div className="decorative-bg">
            <img src="https://via.placeholder.com/150" alt="" />
          </div>

          {/* Right Section: About, Projects, Education, Contact, Skills */}
          <div className="right-section">
            {/* Define Routes */}
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/education" element={<Education />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;