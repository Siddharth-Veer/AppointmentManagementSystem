import React from 'react';
import './HomePage.css';

const AppointmentManagementSystem = () => {
    return (
        <>
            <header>
                <div className="logo">Medisync</div>
                <nav>
                    <ul>
                        <li><a href="#">Menu</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <section className="search-section">
                    <h1>Find the best <span className="highlight">optometrist</span> near me</h1>
                    <div className="search-bar">
                        <input type="text" placeholder="Search by symptom, specialty, or clinic name" />
                        <button>Search</button>
                    </div>
                    <div className="icons">
                        <div className="icon"><img src="path/to/adhd-icon.png" alt="ADHD" /><span>ADHD</span></div>
                        <div className="icon"><img src="path/to/weight-loss-icon.png" alt="Weight Loss" /><span>Weight Loss</span></div>
                        <div className="icon"><img src="path/to/birth-control-icon.png" alt="Birth Control" /><span>Birth Control</span></div>
                        <div className="icon"><img src="path/to/prescription-icon.png" alt="Prescription" /><span>Prescription</span></div>
                        <div className="icon"><img src="path/to/ed-icon.png" alt="ED" /><span>ED</span></div>
                        <div className="icon"><img src="path/to/back-pain-icon.png" alt="Back Pain" /><span>Back Pain</span></div>
                        <div className="icon"><img src="path/to/hair-loss-icon.png" alt="Hair Loss" /><span>Hair Loss</span></div>
                        <div className="icon"><img src="path/to/headache-icon.png" alt="Headache" /><span>Headache</span></div>
                    </div>
                </section>
                <section className="how-it-works">
                    <h2>How It Works</h2>
                    <h3>Three Easy Steps to Book Your Doctor's Appointment Online</h3>
                    <div className="steps">
                        <div className="step">
                            <img src="path/to/search-icon.png" alt="Search Icon" />
                            <h4>1. Search For Care</h4>
                            <p>Enter your location and search for in-person or virtual care appointments.</p>
                        </div>
                        <div className="step">
                            <img src="path/to/compare-icon.png" alt="Compare Icon" />
                            <h4>2. Compare Providers</h4>
                            <p>See a list and map of providers in your area. Compare their services and availability to find the best option for you.</p>
                        </div>
                        <div className="step">
                            <img src="path/to/book-icon.png" alt="Book Icon" />
                            <h4>3. Book an Appointment</h4>
                            <p>Once you’ve selected a provider you can immediately make a booking. Access the care you need in minutes.</p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default AppointmentManagementSystem;
