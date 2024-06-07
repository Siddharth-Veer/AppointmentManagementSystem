import React, { useContext, useEffect } from 'react';
import Appointment from '../components/Appointment';
import { AppointmentContext } from '../context/AppointmentContext';
import AppointmentManagementSystem from '../components/AppointmentManagementSystem';

const HomePage = () => {
  const { appointments, fetchAppointments } = useContext(AppointmentContext);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return (
    <div>
      <AppointmentManagementSystem />
      <h1>Appointments</h1>
      {appointments.map(appointment => (
        <Appointment key={appointment._id} appointment={appointment} />
      ))}
    </div>
  );
};

export default HomePage;
