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
        <Link to="/">Home</Link>
        <Link to="#">Practice Login</Link>
        <Link to="/doctor-signin" onClick={onClose}>Doctor Login</Link>
        <Link to="/admin-login" onClick={onClose}>Admin Login</Link>
        <Link to="#">List Your Practice</Link>
        <Link to="#">Practice Pricing</Link>
        <Link to="/aboutus">About Us</Link>
        <Link to="/contactus">Contact Us</Link>
        <Link to="#">Advertise with Us</Link>
      </div>
  
    </div>
  );
};

export default HamburgerMenu;