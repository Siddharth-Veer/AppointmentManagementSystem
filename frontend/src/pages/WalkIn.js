// src/pages/WalkIn.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/WalkIn.css';

const WalkIn = () => {
  const [ticket, setTicket] = useState(null);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [peopleAhead, setPeopleAhead] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const TIME_INTERVAL = 30; // Minutes

  useEffect(() => {
    const fetchCurrentTicket = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tickets/current');
        setCurrentTicket(response.data);
      } catch (error) {
        console.error('Error fetching current ticket:', error);
      }
    };

    const fetchPeopleAhead = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tickets/people-ahead');
        setPeopleAhead(response.data);
      } catch (error) {
        console.error('Error fetching people ahead:', error);
      }
    };

    fetchCurrentTicket();
    fetchPeopleAhead();
    
    // Update current time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleBuyTicket = async () => {
    setShowModal(true); // Show the modal when "Buy Ticket" is clicked
  };

  const handleModalSubmit = async (event) => {
    event.preventDefault();
    if (!name) {
      setError('Please enter your name.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/tickets/buy', { name });
      setTicket(response.data);
      setError('');
      setShowModal(false); // Hide the modal
      // Refresh people ahead list after buying a ticket
      const peopleResponse = await axios.get('http://localhost:5000/api/tickets/people-ahead');
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
    <div className="walk-in">
      <h2>Walk-In Ticket</h2>
      <button onClick={handleBuyTicket}>Buy Ticket</button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Enter Your Name</h3>
            <form onSubmit={handleModalSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
            </form>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      )}

      {ticket && (
        <div className="ticket-info">
          <p>Your Ticket Number: {ticket.ticketNumber}</p>
          <p>Valid Until: {new Date(ticket.validUntil).toLocaleTimeString()}</p>
          <p>People Ahead: {peopleAhead.length}</p>
          <p>Estimated Wait Time: {calculateWaitTime(ticket.ticketNumber)}</p>
        </div>
      )}

      {currentTicket && !ticket && (
        <div className="current-ticket-info">
          <p>Current Ticket Number: {currentTicket.ticketNumber}</p>
          <p>{calculateTimeUntilCurrentTicketEnds()}</p>
        </div>
      )}
      
      <button onClick={() => window.history.back()}>Back</button>
    </div>
  );
};

export default WalkIn;
