import React, { useState } from 'react';
import '../css/AboutUs.css';

const AboutUs = () => {
    return (
      <div className="about-us">
        <h1>About Us</h1>
        <p>
          Welcome to the Appointment Management System, your go-to solution for efficient scheduling and management of appointments. Our system is designed to simplify the process of booking, tracking, and managing appointments, ensuring a seamless experience for both service providers and clients.
        </p>
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide an easy-to-use platform that enhances productivity and communication, enabling businesses and individuals to manage their appointments effortlessly. We aim to eliminate the hassles of manual scheduling and bring a streamlined approach to appointment management.
        </p>
        <h2>Features</h2>
        <ul>
          <li>Easy appointment booking and tracking</li>
          <li>Automated reminders and notifications</li>
          <li>Customizable scheduling options</li>
          <li>User-friendly interface</li>
          <li>Secure and reliable</li>
        </ul>
        <h2>Contact Us</h2>
        <p>
          If you have any questions or need further assistance, feel free to reach out to us at <a href="mailto:support@appointmentmanagementsystem.com">support@appointmentmanagementsystem.com</a>.
        </p>
      </div>
    );
  }
  
  export default AboutUs;