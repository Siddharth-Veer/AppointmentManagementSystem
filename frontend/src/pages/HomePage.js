import React, { useContext, useEffect } from 'react';
import Appointment from '../components/Appointment';
import { AppointmentContext } from '../context/AppointmentContext';

const HomePage = () => {
  const { appointments, fetchAppointments } = useContext(AppointmentContext);

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div>
      <h1>Appointments</h1>
      {appointments.map(appointment => (
        <Appointment key={appointment._id} appointment={appointment} />
      ))}
    </div>
  );
};

export default HomePage;
