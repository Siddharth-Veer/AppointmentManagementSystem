import React, { useContext, useEffect, useState } from 'react';
import { AppointmentContext } from '../context/AppointmentContext';
import HamburgerMenu from '../components/HamburgerMenu';
import '../css/index.css';
import '../css/index.css';

const HomePage = () => {
  const { appointments, fetchAppointments } = useContext(AppointmentContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (fetchAppointments) {
      fetchAppointments();
    }
  }, [fetchAppointments]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header>
        <img src="logo.png" alt="Medisync Logo" />
        <div className="logo">Medisync</div>
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
            {/* Icons */}
          </div>
        </section>
        <section className="how-it-works">
          <h2>How It Works</h2>
          <h3>Three Easy Steps to Book Your Doctor's Appointment Online</h3>
          <div className="steps">
            {/* Steps */}
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-content">
          {/* Footer Content */}
        </div>
      </footer>
    </>
  );
};

export default HomePage;
