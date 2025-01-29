import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTasks, faGraduationCap, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faBrain } from '@fortawesome/free-solid-svg-icons/faBrain';
import { Navbar, Nav, Container } from 'react-bootstrap';

function NavbarComponent() {
  useEffect(() => {
    // Ensure box-shadow is removed on mount
    document.querySelector('.navbar').style.boxShadow = 'none';
  }, []);

  return (
    <Navbar expand="lg" bg="light" variant="light" className="shadow">
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand href="/" className="brand-left">ARDRA JAYESH</Navbar.Brand>

        {/* Navbar Toggle Button (for mobile) */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Navbar Collapse (for mobile and large screens) */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {/* Home Link */}
            <Nav.Item>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'nav-link active text-primary fw-bold' : 'nav-link'
                }
                to="/"
              >
                <FontAwesomeIcon icon={faHome} className="me-1" />
                HOME
              </NavLink>
            </Nav.Item>

            {/* Skills Link */}
            <Nav.Item>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'nav-link active text-primary fw-bold' : 'nav-link'
                }
                to="/skills"
              >
                <FontAwesomeIcon icon={faBrain} className="me-1" />
                SKILLS
              </NavLink>
            </Nav.Item>

            {/* Projects Link */}
            <Nav.Item>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'nav-link active text-primary fw-bold' : 'nav-link'
                }
                to="/projects"
              >
                <FontAwesomeIcon icon={faTasks} className="me-1" />
                PROJECTS
              </NavLink>
            </Nav.Item>

            {/* Education Link */}
            <Nav.Item>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'nav-link active text-primary fw-bold' : 'nav-link'
                }
                to="/education"
              >
                <FontAwesomeIcon icon={faGraduationCap} className="me-1" />
                EDUCATION
              </NavLink>
            </Nav.Item>

            {/* Contact Link */}
            <Nav.Item>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'nav-link active text-primary fw-bold' : 'nav-link'
                }
                to="/contact"
              >
                <FontAwesomeIcon icon={faEnvelope} className="me-1" />
                CONTACT
              </NavLink>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
