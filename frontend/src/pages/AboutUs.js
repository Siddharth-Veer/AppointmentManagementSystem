import React from 'react';
import '../css/AboutUs.css';
import missionImage from '../images/medi.jpg';
import visionImage from '../images/medi2.jpg';
import teamImage from '../images/medi3.jpg';

const AboutUs = () => {
  return (

    <><header>
      <div className="logo">Medisync</div>
      <nav>
        <ul>
          <li><a href="#">Menu</a></li>
        </ul>
      </nav>
    </header>
    
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

      </div></>
  );
};
export default AboutUs;
