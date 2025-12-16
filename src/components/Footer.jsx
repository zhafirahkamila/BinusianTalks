import React from "react";
import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../styles/customCss.css";

const Footer = () => {
  return (
    <>
      <footer className="border-top py-4 mt-5 footer-style">
        <Container>
          {/* Desktop View */}
          <div className="d-none d-lg-flex flex-wrap justify-content-between align-items-center">
            {/* Menu Kiri */}
            <Nav className="gap-4 nav-left">
              <Nav.Link as={Link} to="/forum" className="text-dark">
                Forum
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="text-dark">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/profile" className="text-dark">
                Profile
              </Nav.Link>
            </Nav>
            {/* Logo Tengah */}
            <div className="d-flex justify-content-center">
              <img
                src={logo}
                alt="BeeTalk Logo"
                height="30"
                className="d-inline-block"
              />
            </div>
            {/* Copyright Kanan */}
            <p className="mb-0 text-dark nav-right">
              © 2025 BINUS Higher Education
            </p>
          </div>

          {/* Mobile View */}
          <div className="d-lg-none text-center">
            {/* Logo */}
            <div className="mb-4">
              <img
                src={logo}
                alt="BeeTalk Logo"
                height="30"
                className="d-inline-block"
              />
            </div>
            {/* Menu */}
            <Nav className="flex-column gap-2 mb-4">
              <Nav.Link as={Link} to="/forum" className="text-dark">
                Forum
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="text-dark">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/profile" className="text-dark">
                Profile
              </Nav.Link>
            </Nav>
            {/* Copyright */}
            <p className="mb-0 text-dark">
              © 2025 BINUS Higher Education
            </p>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;