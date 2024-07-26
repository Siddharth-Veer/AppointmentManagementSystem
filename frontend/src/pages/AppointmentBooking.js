import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/AppointmentBooking.css';
import Map from './Map';

const AppointmentBooking = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    // Fetch doctors data from the server
    axios.get('/api/doctors')
      .then(response => setDoctors(response.data))
      .catch(error => console.error('Error fetching doctors data:', error));
  }, []);

  const updateDateButton = () => {
    return selectedDate.toDateString();
  };

  const populateDays = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<span key={`empty-${i}`}></span>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <span key={i} onClick={() => handleDateChange(i, month, year)}>
          {i}
        </span>
      );
    }

    return days;
  };

  const handleDateChange = (day, month, year) => {
    const newDate = new Date(year, month, day);
    setSelectedDate(newDate);
    setShowCalendar(false);
  };

  const handlePrevMonth = () => {
    const newDate = new Date(selectedDate.setMonth(selectedDate.getMonth() - 1));
    setSelectedDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(selectedDate.setMonth(selectedDate.getMonth() + 1));
    setSelectedDate(newDate);
  };

  return (
    <div className="appointment-booking">
      <div className="top-menu">
        <h2>[patient's name will appear here]</h2>
        <div className="buttons">
          <button className="appointment_btn">Appointments</button>
          <button className="appointment_btn">Walk-In</button>
        </div>
      </div>
      {selectedDoctor ? (
        <div className="appointment-content">
          <div className="appointment-header">
            <p>{selectedDoctor.name}</p>
            <p>{selectedDoctor.speciality}</p>
            <p>Contact: {selectedDoctor.contact}</p>
            <button onClick={() => setSelectedDoctor(null)}>Go Back</button>
          </div>
          <div className="appointment-body">
            <div className="left-sidebar">
              <div className="calendar">
                <div className="calendar-header">
                  <button onClick={handlePrevMonth}>&lt;</button>
                  <span>{selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}</span>
                  <button onClick={handleNextMonth}>&gt;</button>
                </div>
                <div className="calendar-body">
                  <div className="day-names">
                    <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                  </div>
                  <div className="days">
                    {populateDays(selectedDate.getFullYear(), selectedDate.getMonth())}
                  </div>
                </div>
              </div>
            </div>
            <div className="right-content">
              <h2>Doctor's Location</h2>
              <Map location={selectedDoctor.location} />
            </div>
          </div>
        </div>
      ) : (
        <div className="doctors-list">
          <div className="doctors-table">
            <div className="doctors-table-header">
              <div className="doctors-table-cell">Doctor's Name</div>
              <div className="doctors-table-cell">Speciality</div>
              <div className="doctors-table-cell">Contact</div>
            </div>
            {doctors.map((doctor) => (
              <div key={doctor._id} className="doctors-table-row" onClick={() => setSelectedDoctor(doctor)}>
                <div className="doctors-table-cell">
                  <img src={`/images/${doctor.profilePicture}`} alt={doctor.name} className="doctor-profile-picture" />
                  {doctor.name}
                </div>
                <div className="doctors-table-cell">{doctor.speciality}</div>
                <div className="doctors-table-cell">{doctor.contact}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentBooking;
