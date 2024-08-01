import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/AppointmentBooking.css';

const AppointmentBooking = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [showDateTimeSection, setShowDateTimeSection] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    const fetchPatientName = () => {
      const userName = localStorage.getItem('userName');
      setPatientName(userName || 'Guest');
    };

    fetchDoctors();
    fetchPatientName();
  }, []);

  const handleDateChange = (day) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirm = async () => {
    if (selectedTime && selectedDoctor) {
      const appointmentDetails = {
        patientName,
        doctorName: selectedDoctor.name,
        speciality: selectedDoctor.speciality,
        contact: selectedDoctor.contact,
        date: selectedDate.toLocaleDateString(),
        time: selectedTime,
      };

      try {
        const response = await axios.post('http://localhost:5000/api/appointments', appointmentDetails);
        if (response.status === 201) {
          localStorage.setItem('appointmentDetails', JSON.stringify(appointmentDetails));
          navigate('/appointment-confirmation');
        }
      } catch (error) {
        console.error('Error saving appointment:', error);
      }
    } else {
      alert('Please select both a time slot and a doctor.');
    }
  };

  const populateDays = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<span key={`empty-${i}`} className="empty-day"></span>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <span
          key={i}
          onClick={() => handleDateChange(i)}
          className={`day ${
            selectedDate && selectedDate.getDate() === i && selectedDate.getMonth() === month && selectedDate.getFullYear() === year ? 'selected' : ''
          }`}
        >
          {i}
        </span>
      );
    }

    return days;
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleSelectClick = () => {
    setShowDateTimeSection(true);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="appointment-booking">
      <div className="top-menu">
        <h2>Welcome {patientName}!</h2>
        <div className="buttons">
          <button className="appointment_btn">Appointments</button>
          <button className="appointment_btn">Walk-In</button>
          <button className="appointment_btn" onClick={() => navigate('/sign-in')}>Logout</button>
        </div>
      </div>
      <div className="main-container">
        <div className="bottom-section">
          <div className="doctors-list-container">
            <div className="doctors-list">
              <h2>Doctors List:</h2>
              {doctors.map((doctor) => (
                <div key={doctor._id} className="doctor-item" onClick={() => handleDoctorSelect(doctor)}>
                  <div className="doctor-name">{doctor.name}</div>
                </div>
              ))}
            </div>
            <div className="doctor-details-container">
              {selectedDoctor && (
                <><h2>Doctors Details:</h2>
                  <div className="doctor-details">
                    <h2>{selectedDoctor.name}</h2>
                    <p>Speciality: {selectedDoctor.speciality}</p>
                    <p>Contact: {selectedDoctor.contact}</p>
                  </div>
                  <button className="select-button" onClick={handleSelectClick}>Select Date & Time</button>
                </>
              )}
            </div>
            <div className="map-container">
              {selectedDoctor && (
                <iframe
                  title={`Map of ${selectedDoctor.hospital}`}
                  src={`https://maps.google.com/maps?q=${selectedDoctor.hospital}&output=embed`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              )}
            </div>
          </div>
        </div>
        {showDateTimeSection && (
          <div className="top-section">
            <div className="appointment-content">
              <div className="appointment-body">
                <div className="calendar">
                  <div className="calendar-header">
                    <button onClick={handlePrevMonth}>Prev</button>
                    <span>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}</span>
                    <button onClick={handleNextMonth}>Next</button>
                  </div>
                  <div className="calendar-body">
                    <div className="day-names">
                      <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                    </div>
                    <div className="days">
                      {populateDays(currentYear, currentMonth)}
                    </div>
                  </div>
                </div>
                <div className="time-slots">
                  <h2>Available Slots</h2>
                  <div className="slots">
                    <h3>Morning</h3>
                    <div className="slot-times">
                      <button
                        className={selectedTime === '9:00 AM' ? 'active' : ''}
                        onClick={() => handleTimeSelect('9:00 AM')}
                      >
                        9:00 AM
                      </button>
                      <button
                        className={selectedTime === '10:00 AM' ? 'active' : ''}
                        onClick={() => handleTimeSelect('10:00 AM')}
                      >
                        10:00 AM
                      </button>
                      <button
                        className={selectedTime === '11:00 AM' ? 'active' : ''}
                        onClick={() => handleTimeSelect('11:00 AM')}
                      >
                        11:00 AM
                      </button>
                    </div>
                    <h3>Evening</h3>
                    <div className="slot-times">
                      <button
                        className={selectedTime === '1:00 PM' ? 'active' : ''}
                        onClick={() => handleTimeSelect('1:00 PM')}
                      >
                        1:00 PM
                      </button>
                      <button
                        className={selectedTime === '2:00 PM' ? 'active' : ''}
                        onClick={() => handleTimeSelect('2:00 PM')}
                      >
                        2:00 PM
                      </button>
                      <button
                        className={selectedTime === '3:00 PM' ? 'active' : ''}
                        onClick={() => handleTimeSelect('3:00 PM')}
                      >
                        3:00 PM
                      </button>
                    </div>
                  </div>
                  <div className="confirm-button">
                    <button onClick={handleConfirm} disabled={!selectedTime}>
                      Confirm Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;
