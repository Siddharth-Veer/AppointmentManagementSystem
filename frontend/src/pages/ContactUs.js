import React, { useState } from "react";
import '../css/index.css';
import HamburgerMenu from "../components/HamburgerMenu";
import logo from "./logo.png";
const ContactUs = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !name || !phone || !subject || !message) {
      setError("Please fill in all fields");
    }
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);


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
      <div className="container">
        <div className="contact-box">
          <div className="contact-left">
            <h3>Connect With Us</h3>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="contact-row">
                <div className="contact-group">
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e?.target?.value)}
                  />
                </div>
                <div className="contact-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="Your Phone No."
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e?.target?.value)}
                  />
                </div>
              </div>
              <div className="contact-row">
                <div className="contact-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Your email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e?.target?.value)}
                  />
                </div>
                <div className="contact-group">
                  <label className="input-lab">Subject</label>
                  <input
                    type="text"
                    placeholder="Please write Subject here"
                    className="input-message"
                    name="message"
                    value={subject}
                    onChange={(e) => setSubject(e?.target?.value)}
                  />
                </div>
              </div>
              <label>Message</label>
              <textarea
                rows="5"
                placeholder="your message..."
                value={message}
                onChange={(e) => setMessage(e?.target?.value)}
              ></textarea>

              <button type="submit">Send</button>
            </form>
          </div>
        </div>
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

export default ContactUs;
