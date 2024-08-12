import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar sticky="top" bg="light" className="border-bottom mb-4">
      <Container>
        <Navbar.Brand className="text-lg font-weight-semibold">
          Admin Dashboard
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
