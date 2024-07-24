import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const DoctorPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments', error);
    }
  };

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedAppointment(null);
    setModalIsOpen(false);
  };

  const handleDone = async () => {
    try {
      await axios.put(`/api/appointments/${selectedAppointment.id}/done`);
      fetchAppointments();
      closeModal();
    } catch (error) {
      console.error('Error marking appointment as done', error);
    }
  };

  const handleReschedule = async (newDate) => {
    try {
      await axios.put(`/api/appointments/${selectedAppointment.id}/reschedule`, { date: newDate });
      fetchAppointments();
      closeModal();
    } catch (error) {
      console.error('Error rescheduling appointment', error);
    }
  };

  return (
    <div>
      <h1>Doctor's Appointments</h1>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.date} - {appointment.patientName}
            <button onClick={() => openModal(appointment)}>View Details</button>
          </li>
        ))}
      </ul>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        {selectedAppointment && (
          <div>
            <h2>Patient Details</h2>
            <p>Name: {selectedAppointment.patientName}</p>
            <p>Age: {selectedAppointment.patientAge}</p>
            <p>Reason: {selectedAppointment.reason}</p>
            <button onClick={handleDone}>Done</button>
            <button onClick={() => handleReschedule(prompt('Enter new date:'))}>Reschedule</button>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DoctorPage;
