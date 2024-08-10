import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DoctorPage.css';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleAppointmentSelect = (appointment) => {
    setSelectedAppointment(appointment);
    setSelectedDate(new Date(appointment.date));
  };

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  const handleReschedule = async () => {
    if (selectedAppointment && selectedDate) {
      try {
        const response = await axios.put(`http://localhost:5000/api/appointments/${selectedAppointment._id}`, {
          date: selectedDate.toLocaleDateString(),
        });
        if (response.status === 200) {
          alert('Appointment rescheduled successfully');
          setAppointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
              appointment._id === selectedAppointment._id
                ? { ...appointment, date: selectedDate.toLocaleDateString() }
                : appointment
            )
          );
          setSelectedAppointment(null); // Clear the selected appointment
        }
      } catch (error) {
        console.error('Error rescheduling appointment:', error);
        alert('Failed to reschedule the appointment.');
      }
    } else {
      alert('Please select an appointment and a new date.');
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/appointments/${appointmentId}`);
      if (response.status === 200) {
        alert('Appointment cancelled successfully');
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment._id !== appointmentId)
        );
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert('Failed to cancel the appointment.');
    }
  };

  return (
    <div className="doctor-dashboard-container">
      <div className="doctor-dashboard-header">
        <h1>Doctor Dashboard</h1>
        <button onClick={() => navigate('/doctor/profile')}>Go to Profile</button>
      </div>
      <div className="appointments-list">
        <h2>Upcoming Appointments</h2>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div
              key={appointment._id}
              className={`appointment-card ${selectedAppointment?._id === appointment._id ? 'selected' : ''}`}
              onClick={() => handleAppointmentSelect(appointment)}
            >
              <p>Patient: {appointment.patientName}</p>
              <p>Date: {appointment.date}</p>
              <p>Time: {appointment.time}</p>
              <button onClick={() => handleCancel(appointment._id)}>Cancel Appointment</button>
            </div>
          ))
        ) : (
          <p>No upcoming appointments.</p>
        )}
      </div>
      {selectedAppointment && (
        <div className="reschedule-section">
          <h2>Reschedule Appointment</h2>
          <label>
            Select New Date:
            <input type="date" value={selectedDate.toISOString().substr(0, 10)} onChange={handleDateChange} />
          </label>
          <button onClick={handleReschedule}>Reschedule</button>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
