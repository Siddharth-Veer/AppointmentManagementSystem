import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Appointment from "../components/Appointment";
import { AppointmentContext } from "../context/AppointmentContext";
import HamburgerMenu from "../components/HamburgerMenu";
import "../css/index.css";
import logo from "./logo.png"; // Import the logo image
import healthCareGif from "./health-care.gif"; // Import the GIF

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Define the cards with the necessary data
  const cards = [
    {
      id: 1,
      image: "/images/man.jpg",
      title: "1. Kevin Johnson",
      text: "'I had an excellent experience with the Medisync platform. Finding a specialist was easy, and the appointment scheduling was seamless. The care I received was top-notch, and the staff was incredibly supportive. I highly recommend this service to anyone looking for reliable healthcare.'",
      footer: "Last updated 3 mins ago",
    },
    {
      id: 2,
      image: "/images/man2.jpg",
      title: "2. Jane Smith",
      text: "'Medisync made my healthcare journey smooth and stress-free. The process of booking an appointment was straightforward, and the doctor I saw was professional and attentive. I appreciate the convenience of being able to manage everything online.'",
      footer: "Last updated 10 mins ago",
    },
    {
      id: 3,
      image: "/images/woman.jpg",
      title: "3. Kylie Adams",
      text: "'As a busy professional, I often struggle to find time for medical appointments. Medisync's platform allowed me to quickly find a provider that fits my schedule. The service was efficient, and I felt well taken care of throughout the entire process.'",
      footer: "Last updated 20 mins ago",
    },
    {
      id: 4,
      image: "/images/woman2.jpg",
      title: "4. Emily Davis",
      text: '"I was impressed by the ease of use and the quality of care provided through Medisync. The platforms interface was user-friendly, and the medical team was compassionate and knowledgeable. Its great to have such a reliable resource for managing my health."',
      footer: "Last updated 30 mins ago",
    },
    {
      id: 5,
      image: "/images/woman.jpg",
      title: "5. Sarah Brown",
      text: '"Medisync has been a game-changer for me. The ability to compare providers and read reviews helped me make an informed decision about my healthcare. The appointment process was quick, and the follow-up was thorough. I will definitely continue using this service."',
      footer: "Last updated 1 hour ago",
    },
  ];

  const cardsToShow = 6; // Number of cards to show at once

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - cardsToShow : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === cards.length - cardsToShow ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="slider-container">
      <h2>Testimonials</h2>

      <div className="slider-content">
        {cards.slice(currentIndex, currentIndex + cardsToShow).map((card) => (
          <div
            key={card.id}
            className="slider-card card mb-3"
            style={{ maxWidth: "540px" }}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={card.image}
                  className="img-fluid rounded-circle slider-card-img"
                  alt={card.title}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.text}</p>
                  <p className="card-text">
                    <small className="text-body-secondary">{card.footer}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="slider-btn-holder">
        <button className="slider-button" onClick={handlePrev}>
          &#10094;
        </button>
        <button className="slider-button" onClick={handleNext}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [symptoms, setSymptoms] = useState([]);
  const [symptomQuery, setSymptomQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await axios.get('https://medisync-w9rq.onrender.com/api/symptoms');
        setSymptoms(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching symptoms:', error);
      }
    };

    fetchSymptoms();
  }, []);

  const handleSymptomChange = (e) => {
    const query = e.target.value;
    setSymptomQuery(query);

    if (query) {
      const filteredSymptoms = symptoms.filter(symptom =>
        symptom.symptom.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSymptoms);
      console.log(filteredSymptoms);
    } else {
      setSuggestions([]);
    }
  };

  const handleSymptomSelect = (symptom) => {
    setSymptomQuery(symptom.symptom);
    setSuggestions([]);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header>
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
      <main>
        <section className="search-section">
          <div className="navbar main-search-section">
            <div className="container-fluid hero-section" >
              <div className="search-container">
                <h1>Find the best <span className="highlight">health specialist</span> for you!</h1>
                <form className="d-flex search-form" role="search">
                  <div className="position-relative">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search symptoms"
                      aria-label="Search"
                      value={symptomQuery}
                      onChange={handleSymptomChange}
                    />
                    {suggestions.length > 0 && (
                      <div className="dropdown-menu show w-100" style={{ top: '100%' }}>
                        {suggestions.map(symptom => (
                          <div
                            key={symptom._id}
                            className="dropdown-item"
                            onClick={() => handleSymptomSelect(symptom)}
                          >
                            {symptom.symptom}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    className="btn btn-outline-success"
                    style={{ marginLeft: '10px' }}
                    type="button"
                    onClick={() => {
                      sessionStorage.setItem('selectedSymptom', symptomQuery);
                      navigate('/sign-up');
                    }}
                  >
                    Search
                  </button>
                </form>
              </div>

              <div className="search-container image-gif">
                <picture className="main-gif">
                  <img
                    className="giphy-gif-img giphy-img-loaded"
                    src={healthCareGif}
                    alt="Health Care GIF"
                  />
                </picture>
              </div>
            </div>
          </div>

          <div className="icons">
            <div className="icon">
              <img src="/images/ADHD-icon.png" alt="ADHD" />{" "}
              {/* Image from public folder */}
              <span>ADHD</span>
            </div>
            <div className="icon">
              <img src="/images/Weight-loss-icon.png" alt="Weight Loss" />
              <span>Weight Loss</span>
            </div>
            <div className="icon">
              <img src="/images/Birth-Control-icon.png" alt="Birth Control" />
              <span>Birth Control</span>
            </div>
            <div className="icon">
              <img src="/images/Prescription-icon.png" alt="Prescription" />
              <span>Prescription</span>
            </div>
            <div className="icon">
              <img src="/images/Back-Pain-icon.png" alt="Back Pain" />
              <span>Back Pain</span>
            </div>
            <div className="icon">
              <img src="/images/Hair-loss-icon.png" alt="Hair Loss" />
              <span>Hair Loss</span>
            </div>
            <div className="icon">
              <img src="/images/Headache-icon.png" alt="Headache" />
              <span>Headache</span>
            </div>
          </div>
        </section>

        <section className="how-it-works">
          <h2>How It Works</h2>
          <h3>Three Easy Steps to Book Your Doctor's Appointment Online</h3>

          <div className="steps">
            <div className="card card-holder" style={{ width: "18rem" }}>
              <img
                src="/images/cares.jpg"
                className="card-img-top card-image"
                alt="Care Image"
              />

              <div className="card-body">
                <h5 className="card-title">1. Search For Care</h5>
                <p className="card-text">
                  Enter your location and search for in-person or virtual care
                  appointments.
                </p>
                <a href="" className="btn btn-primary">
                  Learn More..
                </a>
              </div>
            </div>

            <div className="card card-holder" style={{ width: "18rem" }}>
              <img
                src="/images/compare.jpg"
                className="card-img-top card-image"
                alt="Compare Image"
              />

              <div className="card-body">
                <h5 className="card-title">2. Compare Providers</h5>
                <p className="card-text">
                  See a list and map of providers in your area. Compare their
                  services and availability to find the best option for you.
                </p>
                <a href="" className="btn btn-primary">
                  Learn More..
                </a>
              </div>
            </div>

            <div className="card card-holder" style={{ width: "18rem" }}>
              <img
                src="/images/appointment.jpg"
                className="card-img-top card-image"
                alt="Appointment Image"
              />

              <div className="card-body">
                <h5 className="card-title">3. Book an Appointment</h5>
                <p className="card-text">
                  Once you’ve selected a provider you can immediately make a
                  booking. Access the care you need in minutes.
                </p>
                <a href="" className="btn btn-primary">
                  Learn More..
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="slider-section">
          <Slider />
        </section>
      </main>

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

export default HomePage;
