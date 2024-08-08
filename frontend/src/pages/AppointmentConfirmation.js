import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AppointmentConfirmation.css';

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
    <div className="confirmation-container">
      <div className="confirmation-form">
        <h2>Appointment Confirmation</h2>
        <div className="form-section">
          <label>Patient Name:</label>
          <p>{appointmentDetails.patientName}</p>
        </div>
        <div className="form-section">
          <label>Doctor Name:</label>
          <p>{appointmentDetails.doctorName}</p>
        </div>
        <div className="form-section">
          <label>Speciality:</label>
          <p>{appointmentDetails.speciality}</p>
        </div>
        <div className="form-section">
          <label>Contact:</label>
          <p>{appointmentDetails.contact}</p>
        </div>
        <div className="form-section">
          <label>Date:</label>
          <p>{appointmentDetails.date}</p>
        </div>
        <div className="form-section">
          <label>Time:</label>
          <p>{appointmentDetails.time}</p>
        </div>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;