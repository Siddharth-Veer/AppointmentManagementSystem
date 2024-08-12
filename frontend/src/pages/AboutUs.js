import React, { useState } from "react";
import '../css/index.css';
import missionImage from '../images/medi.jpg';
import visionImage from '../images/medi2.jpg';
import teamImage from '../images/medi3.jpg';
import HamburgerMenu from "../components/HamburgerMenu";
import logo from "./logo.png";
const AboutUs = () => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (

    <><header>
    <div className="logo-section">
      <img className="logo" src={logo} alt="Medisync Logo" />
      <p className="brand-name">Medisync</p>
    </div>

    <nav>
      <ul>
        <li>
          <a href="#" onClick={toggleMenu}>
            Menu
          </a>
        </li>
      </ul>
    </nav>
  </header>
  <HamburgerMenu isOpen={isMenuOpen} onClose={toggleMenu} />
    
    <div className="about-us-container">
        <section className="hero-section">
          <div className="hero-content">
            <h1>About MediSync</h1>
            <p>MediSync is Canada's largest online and mobile real-time resource for same-day access to care.</p>
          </div>
        </section>

        <section className="section mission-section">
          <div className="text-container">
            <h2>Our Mission</h2>
            <p>Our mission is to empower patients by providing them with the information they need to access timely healthcare. We believe in a healthcare system where patients can easily navigate their options and choose the best care for their needs.</p>
          </div>
          <div className="image-container">
            <img src={missionImage} alt="Mission" />
          </div>
        </section>

        <section className="section vision-section">
          <div className="text-container">
            <h2>Our Vision</h2>
            <p>We envision a world where accessing healthcare is simple, convenient, and stress-free. Our goal is to be the trusted resource that patients turn to for finding the right care at the right time.</p>
          </div>
          <div className="image-container">
            <img src={visionImage} alt="Vision" />
          </div>
        </section>

        <section className="section team-section">
          <div className="text-container">
            <h2>Our Team</h2>
            <p>Our team is made up of dedicated professionals who are passionate about improving healthcare accessibility. We bring together expertise in technology, healthcare, and customer service to deliver the best possible experience for our users.</p>
          </div>
          <div className="image-container">
            <img src={teamImage} alt="Team" />
          </div>
        </section>

      </div>
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo">Medisync</div>
            <div>
              <p className="footer-para">
                "Empowering healthcare, one sync at a time – Medisync: Where
                precision meets compassion."
              </p>
            </div>
          </div>
          <div className="footer-links">
            <div className="column">
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Press</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
              </ul>
            </div>
            <div className="column">
              <h4>Support</h4>
              <ul>
                <li>
                  <a href="#">Help Center</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
              </ul>
            </div>
            <div className="column">
              <h4>Community</h4>
              <ul>
                <li>
                  <a href="#">Developers</a>
                </li>
                <li>
                  <a href="#">Partners</a>
                </li>
                <li>
                  <a href="#">Affiliates</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <p>&copy; 2023 Medisync. All rights reserved.</p>
        </div>
      </footer>
      </>
  );
};
export default AboutUs;
