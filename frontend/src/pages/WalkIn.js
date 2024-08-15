import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included
import logo from "./logo.png";

const WalkIn = () => {
  const [ticket, setTicket] = useState(null);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [peopleAhead, setPeopleAhead] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [patientName, setPatientName] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const START_TIME = new Date();
  START_TIME.setHours(9, 0, 0, 0); // Start time: 9:00 AM

  const END_TIME = new Date();
  END_TIME.setHours(18, 0, 0, 0); // End time: 6:00 PM

  const TIME_INTERVAL = 30; // Minutes

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentTicket = async () => {
      try {
        const response = await axios.get('https://medisync-w9rq.onrender.com/api/tickets/current');
        setCurrentTicket(response.data);
      } catch (error) {
        console.error('Error fetching current ticket:', error);
      }
    };

    const fetchPatientName = () => {
      const userName = sessionStorage.getItem('userName');
      setPatientName(userName || 'Guest');
    };

    const fetchPeopleAhead = async () => {
      try {
        const response = await axios.get('https://medisync-w9rq.onrender.com/api/tickets/people-ahead');
        setPeopleAhead(response.data);
      } catch (error) {
        console.error('Error fetching people ahead:', error);
      }
    };

    fetchPatientName();
    fetchCurrentTicket();
    fetchPeopleAhead();

    // Update current time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleBuyTicket = () => {
    setShowModal(true); // Show the modal when "Buy Ticket" is clicked
  };

  const handleModalSubmit = async (event) => {
    event.preventDefault();
    if (!name) {
      setError('Please enter your name.');
      return;
    }

    try {
      const now = new Date();
      let nextAvailableTime = new Date();

      if (now < START_TIME) {
        nextAvailableTime = START_TIME;
      } else {
        const elapsedMinutes = Math.floor((now - START_TIME) / (1000 * 60));
        const ticketsElapsed = Math.floor(elapsedMinutes / TIME_INTERVAL);
        nextAvailableTime = new Date(START_TIME.getTime() + (ticketsElapsed + 1) * TIME_INTERVAL * 60000);
      }

      if (nextAvailableTime >= END_TIME) {
        alert('Walk-in hours are over for today.');
        setShowModal(false);
        return;
      }

      const validUntil = new Date(nextAvailableTime.getTime() + TIME_INTERVAL * 60000);

      // Post the ticket to the server
      const response = await axios.post('https://medisync-w9rq.onrender.com/api/tickets/buy', { name, validUntil });
      setTicket(response.data);
      setError('');
      setShowModal(false); // Hide the modal
      // Refresh people ahead list after buying a ticket
      const peopleResponse = await axios.get('https://medisync-w9rq.onrender.com/api/tickets/people-ahead');
      setPeopleAhead(peopleResponse.data);
    } catch (error) {
      setError('Error buying ticket. Please try again.');
    }
  };

  const calculateWaitTime = (ticketNumber) => {
    if (!ticketNumber || !currentTicket) return '';

    const currentTicketNumber = currentTicket.ticketNumber;
    const numberOfTicketsAhead = ticketNumber - currentTicketNumber;
    const waitTimeMinutes = numberOfTicketsAhead * TIME_INTERVAL;

    const waitUntil = new Date();
    waitUntil.setMinutes(waitUntil.getMinutes() + waitTimeMinutes);

    return `Your ticket will be called at ${waitUntil.toLocaleTimeString()}`;
  };

  const calculateTimeUntilCurrentTicketEnds = () => {
    if (!currentTicket) return '';

    const endTime = new Date(currentTicket.startTime);
    endTime.setMinutes(endTime.getMinutes() + TIME_INTERVAL);

    const timeUntilEnd = endTime - currentTime;
    const minutesUntilEnd = Math.max(0, Math.floor(timeUntilEnd / 60000));

    return `Current ticket will end in ${minutesUntilEnd} minute(s)`;
  };

  return (
    <Container className="mt-5">
      <div className="logo-section">
          <img className="logo" src={logo} alt="Medisync Logo" />
        </div>
      <Row className="mb-4">
        <Col>
          <h2>Welcome, {patientName}!</h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" className="me-2" onClick={() => navigate('/appointments')}>Appointments</Button>
          <Button variant="secondary" className="me-2" onClick={() => navigate('/walk-in')}>Walk-In</Button>
          <Button variant="danger" onClick={() => navigate('/sign-in')}>Logout</Button>
        </Col>
      </Row>

      <Button variant="primary" className="mb-3" onClick={handleBuyTicket}>Buy Ticket</Button>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Enter Your Name</h5>
                <Button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span>&times;</span>
                </Button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleModalSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  {error && <div className="alert alert-danger mt-2">{error}</div>}
                  <div className="mt-3">
                    <Button type="submit" variant="primary">Submit</Button>
                    <Button type="button" variant="secondary" className="ml-2" onClick={() => setShowModal(false)}>Cancel</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {ticket && (
        <div className="alert alert-info mt-4">
          <p>Your Ticket Number: {ticket.ticketNumber}</p>
          <p>Valid Until: {new Date(ticket.validUntil).toLocaleTimeString()}</p>
          <p>People Ahead: {peopleAhead.length}</p>
          <p>Estimated Wait Time: {calculateWaitTime(ticket.ticketNumber)}</p>
        </div>
      )}

      {currentTicket && !ticket && (
        <div className="alert alert-warning mt-4">
          <p>Current Ticket Number: {currentTicket.ticketNumber}</p>
          <p>{calculateTimeUntilCurrentTicketEnds()}</p>
        </div>
      )}
      
      <Button variant="secondary" className="mt-4" onClick={() => window.history.back()}>Back</Button>
    </Container>
  );
};

export default WalkIn;
