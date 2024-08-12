import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included

const ManageAppointments = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch list of doctors
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    // Fetch appointments for the selected doctor
    const fetchAppointments = async () => {
      if (selectedDoctor) {
        try {
          const response = await axios.get(`http://localhost:5000/api/appointments`);
          // Filter appointments based on the selected doctor's name
          const filteredAppointments = response.data.filter(appointment => appointment.doctorName === selectedDoctor);
          setAppointments(filteredAppointments);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      } else {
        // Clear appointments if no doctor is selected
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, [selectedDoctor]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Appointments</h2>
      <div className="mb-4">
        <select 
          onChange={(e) => setSelectedDoctor(e.target.value)} 
          value={selectedDoctor}
          className="form-select"
        >
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor.name}>
              {doctor.name}
            </option>
          ))}
        </select>
      </div>
      {selectedDoctor && (
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Appointments for {selectedDoctor}</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Contact</th>
                  <th>Doctor's Name</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <td>{appointment.patientName}</td>
                      <td>{appointment.date}</td>
                      <td>{appointment.time}</td>
                      <td>{appointment.contact}</td>
                      <td>{appointment.doctorName}</td> {/* Display the doctor's name from appointment data */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">No appointments found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAppointments;