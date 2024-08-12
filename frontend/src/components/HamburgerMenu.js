import React from 'react';
import { Link } from 'react-router-dom'; // Add this line
import '../css/HamburgerMenu.css';


const HamburgerMenu = ({ isOpen, onClose }) => {
  return (
    <div className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
      <div className="menu-header">
        <h2>Manage your health better</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="menu-content">
        <p>Get up-to-date notifications on walk-in clinic wait-times</p>
        <p>Save time by reserving and managing bookings</p>
        <Link to="/sign-up" className="create-account" onClick={onClose}>Create a patient account</Link>
        <Link to="/sign-in" onClick={onClose}>Have an account? Sign in here</Link>
        <hr />
        <a href="#">Practice Login</a>
        <Link to="/doctor-signin" onClick={onClose}>Doctor Login</Link>
        <Link to="/admin-login" onClick={onClose}>Admin Login</Link>
        <a href="#">List Your Practice</a>
        <a href="#">Practice Pricing</a>
        <a href="#">About Us</a>
        <a href="#">Advertise with Us</a>
        <a href="#">Contact Us</a>
      </div>
    </div>
  );
};

export default HamburgerMenu;