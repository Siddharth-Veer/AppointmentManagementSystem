import React, { useState } from 'react';
import '../css/AppointmentBooking.css';
import doctor1 from '../images/doctor-1.jpg';
import doctor2 from '../images/doctor-2.jpg';
import doctor3 from '../images/doctor-3.jpg';

const doctors = [
  { id: 1, name: 'Dr. Nishant Clinician', speciality: 'Pediatrics', contact: '123-456-7890', profilePicture: doctor1, appointments: [{ time: '10:00 AM', patient: 'Alice' }, { time: '11:00 AM', patient: 'Bob' }] },
  { id: 2, name: 'Dr. John Doe', speciality: 'Cardiology', contact: '234-567-8901', profilePicture: doctor2, appointments: [{ time: '12:00 PM', patient: 'Charlie' }] },
  { id: 3, name: 'Dr. Jane Smith', speciality: 'Dermatology', contact: '345-678-9012', profilePicture: doctor3, appointments: [{ time: '01:00 PM', patient: 'David' }] },
  { id: 1, name: 'Dr. Nishant Clinician', speciality: 'Pediatrics', contact: '123-456-7890', profilePicture: doctor1, appointments: [{ time: '10:00 AM', patient: 'Alice' }, { time: '11:00 AM', patient: 'Bob' }] },
  { id: 2, name: 'Dr. John Doe', speciality: 'Cardiology', contact: '234-567-8901', profilePicture: doctor2, appointments: [{ time: '12:00 PM', patient: 'Charlie' }] },
  { id: 3, name: 'Dr. Jane Smith', speciality: 'Dermatology', contact: '345-678-9012', profilePicture: doctor3, appointments: [{ time: '01:00 PM', patient: 'David' }] },
];

const AppointmentBooking = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

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
        <div className="calendar-button">
          <button onClick={() => setShowCalendar(!showCalendar)}>
            {updateDateButton()}
          </button>
          {showCalendar && (
            <div className="calendar-dropdown">
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
          )}
        </div>
        <div className="buttons">
          <button className="appointment_btn">Appointments</button>
          <button className="appointment_btn">Walk-In</button>
        </div>
      </div>
      {selectedDoctor ? (
        <div className="appointment-content">
          <div className="appointment-header">
            <button onClick={() => setSelectedDoctor(null)}>Back</button>
            <h2>{selectedDoctor.name}</h2>
            <h3>{selectedDoctor.speciality}</h3>
            <p>Contact: {selectedDoctor.contact}</p>
          </div>
          <div className="appointments">
            <h2>Available Slots</h2>
            <div className="appointment-slots">
              {/* Generate morning and evening slots as per the provided image */}
              <div className="slots">
                <h3>Morning</h3>
                <div className="slot-times">
                  {/* Add slot buttons here */}
                </div>
              </div>
              <div className="slots">
                <h3>Evening</h3>
                <div className="slot-times">
                  {/* Add slot buttons here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="doctors-list">
          <h2>Doctors List</h2>
          <div className="doctors-table">
            <div className="doctors-table-header">
              <div className="doctors-table-cell">Doctor's Name</div>
              <div className="doctors-table-cell">Speciality</div>
              <div className="doctors-table-cell">Contact</div>
            </div>
            {doctors.map((doctor) => (
              <div key={doctor.id} className="doctors-table-row" onClick={() => setSelectedDoctor(doctor)}>
                <div className="doctors-table-cell">
                  <img src={doctor.profilePicture} alt={doctor.name} className="doctor-profile-picture" />
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