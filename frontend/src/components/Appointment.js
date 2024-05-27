import React from 'react';

const Appointment = ({ appointment }) => {
  return (
    <div>
      <h2>{appointment.clientName}</h2>
      <p>{new Date(appointment.date).toLocaleString()}</p>
      <p>{appointment.service}</p>
    </div>
  );
};

export default Appointment;
