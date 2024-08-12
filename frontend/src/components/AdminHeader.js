import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container } from 'react-bootstrap';
import logo from "../pages/logo.png";

const Header = () => {
  return (
    <Navbar sticky="top" bg="light" className="border-bottom mb-4">
      <div className="logo-section">
          <img className="logo" src={logo} alt="Medisync Logo" />
          <p className="brand-name">Medisync</p>
        </div>
      <Container>
        <Navbar.Brand className="text-lg font-weight-semibold">
          Admin Dashboard
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
