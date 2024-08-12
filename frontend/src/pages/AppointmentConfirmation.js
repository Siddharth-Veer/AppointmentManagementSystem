import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

const AppointmentConfirmation = () => {
  const [appointmentDetails, setAppointmentDetails] = useState({
    patientName: '',
    doctorName: '',
    speciality: '',
    contact: '',
    date: '',
    time: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedDetails = JSON.parse(localStorage.getItem('appointmentDetails'));
    if (storedDetails) {
      setAppointmentDetails(storedDetails);
    } else {
      console.error('No appointment details found in local storage');
    }
  }, []);

  return (
    <Container className="confirmation-container">
      <Card className="confirmation-form">
        <Card.Body>
          <Card.Title>Appointment Confirmation</Card.Title>
          <div className="form-section">
            <Card.Subtitle className="mb-2 text-muted">Patient Name:</Card.Subtitle>
            <Card.Text>{appointmentDetails.patientName}</Card.Text>
          </div>
          <div className="form-section">
            <Card.Subtitle className="mb-2 text-muted">Doctor Name:</Card.Subtitle>
            <Card.Text>{appointmentDetails.doctorName}</Card.Text>
          </div>
          <div className="form-section">
            <Card.Subtitle className="mb-2 text-muted">Speciality:</Card.Subtitle>
            <Card.Text>{appointmentDetails.speciality}</Card.Text>
          </div>
          <div className="form-section">
            <Card.Subtitle className="mb-2 text-muted">Contact:</Card.Subtitle>
            <Card.Text>{appointmentDetails.contact}</Card.Text>
          </div>
          <div className="form-section">
            <Card.Subtitle className="mb-2 text-muted">Date:</Card.Subtitle>
            <Card.Text>{appointmentDetails.date}</Card.Text>
          </div>
          <div className="form-section">
            <Card.Subtitle className="mb-2 text-muted">Time:</Card.Subtitle>
            <Card.Text>{appointmentDetails.time}</Card.Text>
          </div>
          <Button variant="primary" onClick={() => navigate('/appointments')}>Go to Appointments</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AppointmentConfirmation;
