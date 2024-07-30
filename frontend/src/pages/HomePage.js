import React, { useContext, useEffect, useState } from 'react';  // Add useState here
import Appointment from '../components/Appointment';
import { AppointmentContext } from '../context/AppointmentContext';
import HamburgerMenu from '../components/HamburgerMenu';
import '../css/HomePage.css';

const HomePage = () => {
  const { appointments, fetchAppointments } = useContext(AppointmentContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // useState is now correctly imported

  useEffect(() => {
    fetchAppointments();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header>
<<<<<<< HEAD
        <div className="logo" >Medisync</div>
=======
        <img src="logo.png" alt="Medisync Logo" />
        <div className="logo">Medisync</div>
>>>>>>> 39c7c603d627a15cd5e0fb302fb91643941bb1ed
        <nav>
          <ul>
            <li><a href="#" onClick={toggleMenu}>Menu</a></li>
          </ul>
        </nav>
      </header>
      <HamburgerMenu isOpen={isMenuOpen} onClose={toggleMenu} />
      <main>
        <section className="search-section">
          <h1>Find the best <span className="highlight">optometrist</span> near me</h1>
          <div className="search-bar">
            <input type="text" placeholder="Search by symptom, specialty, or clinic name" />
            <button>Search</button>
          </div>
          <div className="icons">
            <div className="icon"><img src="#" alt="ADHD" /><span>ADHD</span></div>
            <div className="icon"><img src="#" alt="Weight Loss" /><span>Weight Loss</span></div>
            <div className="icon"><img src="#" alt="Birth Control" /><span>Birth Control</span></div>
            <div className="icon"><img src="#" alt="Prescription" /><span>Prescription</span></div>
            <div className="icon"><img src="#" alt="Back Pain" /><span>Back Pain</span></div>
            <div className="icon"><img src="#" alt="Hair Loss" /><span>Hair Loss</span></div>
            <div className="icon"><img src="#" alt="Headache" /><span>Headache</span></div>
          </div>
        </section>
        <section className="how-it-works">
          <h2>How It Works</h2>
          <h3>Three Easy Steps to Book Your Doctor's Appointment Online</h3>
          <div className="steps">
            <div className="step">
              <img src="#" alt="Search Icon" />
              <h4>1. Search For Care</h4>
              <p>Enter your location and search for in-person or virtual care appointments.</p>
            </div>
            <div className="step">
              <img src="#" alt="Compare Icon" />
              <h4>2. Compare Providers</h4>
              <p>See a list and map of providers in your area. Compare their services and availability to find the best option for you.</p>
            </div>
            <div className="step">
              <img src="#" alt="Book Icon" />
              <h4>3. Book an Appointment</h4>
              <p>Once you’ve selected a provider you can immediately make a booking. Access the care you need in minutes.</p>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo">Medisync</div>
          </div>
          <div className="footer-links">
            <div className="column">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
            <div className="column">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
            <div className="column">
              <h4>Community</h4>
              <ul>
                <li><a href="#">Developers</a></li>
                <li><a href="#">Partners</a></li>
                <li><a href="#">Affiliates</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
          <p>&copy; 2024 Medisync. All rights reserved.</p>
          <span>|</span>
          <a href="#">Privacy Policy</a>
        </div>
      </footer>
    </>
  );
};

export default HomePage;