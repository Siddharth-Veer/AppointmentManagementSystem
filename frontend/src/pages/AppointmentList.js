import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from "./logo.png";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [patientName, setPatientName] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      const storedPatientName = sessionStorage.getItem('userName'); // Corrected key from 'patientName' to 'userName'

      if (!storedPatientName) {
        console.error('Patient name not found in session storage. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://medisync-w9rq.onrender.com/api/appointments?patientName=${encodeURIComponent(storedPatientName)}`);
        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      }
    };

    const fetchPatientName = () => {
      const userName = sessionStorage.getItem('userName');
      setPatientName(userName || 'Guest');
    };

    fetchPatientName();
    fetchAppointments();
  }, []);

  const handleCancel = async (appointmentId) => {
    try {
      await axios.delete(`https://medisync-w9rq.onrender.com/api/appointments/${appointmentId}`);
      setAppointments(appointments.filter(app => app._id !== appointmentId));
      alert('Appointment cancelled successfully');
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert('Failed to cancel the appointment');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (appointments.length === 0) {
    return <div>No appointments found.</div>;
  }

  return (
    <Container className="appointment-list">
      <div className="logo-section">
          <img className="logo" src={logo} alt="Medisync Logo" />
          <p className="brand-name">Medisync</p>
        </div>
      <Row className="mb-4">
        <Col>
          <h2>Welcome, {patientName}!</h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" className="me-2" onClick={() => navigate('/appointment-booking')}>Book Appointment</Button>
          <Button variant="secondary" className="me-2" onClick={() => navigate('/walk-in')}>Walk-In</Button>
          <Button variant="danger" onClick={() => navigate('/sign-in')}>Logout</Button>
        </Col>
      </Row>
      <Row>
        {appointments.map((appointment, index) => (
          <Col md={6} key={index}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{appointment.doctorName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{appointment.speciality}</Card.Subtitle>
                <Card.Text>
                  Date: {appointment.date}<br />
                  Time: {appointment.time}<br />
                  Contact: {appointment.contact}
                </Card.Text>
                <Button variant="danger" onClick={() => handleCancel(appointment._id)}>Cancel Appointment</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AppointmentList;
