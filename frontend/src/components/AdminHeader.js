import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container } from 'react-bootstrap';
import logo from "../pages/logo.png";

const Header = () => {
  return (
    <Navbar
      sticky="top"
      bg="light"
      className="border-bottom mb-4"
      style={{ padding: '8px 16px' }} // Reduce padding for smaller header
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={logo}
          alt="Medisync Logo"
          style={{ width: '40px', height: 'auto' }} // Adjust logo size
        />
        <p style={{ fontSize: '1rem', marginLeft: '8px', fontWeight: '500' }}>
          Medisync
        </p>
      </div>
      <Container>
        <Navbar.Brand
          style={{ fontSize: '1rem', fontWeight: '500' }} // Adjust text size and weight
        >
          Admin Dashboard
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
