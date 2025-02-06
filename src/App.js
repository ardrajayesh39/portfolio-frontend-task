import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Education from './components/Education';
import Skills from './components/Skills'; 
import Login from "./admin/Login";
import Admin from "./admin/Admin";

import './App.css';

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const location = useLocation(); // Get current path

  // Hide navbar on login and admin pages
  const hideNavbar = location.pathname === '/login' || location.pathname === '/admin';

  return (
    <div className="App">
      {/* Conditionally Render Navbar */}
      {!hideNavbar && <Navbar />}

      <div className="page-container">
        <div className="right-section">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/education" element={<Education />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />

          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
