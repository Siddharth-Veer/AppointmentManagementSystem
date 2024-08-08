import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/index.css';

const AppointmentBooking = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [showDateTimeSection, setShowDateTimeSection] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
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
      const userName = sessionStorage.getItem('userName');
      setPatientName(userName || 'Guest');
    };

    fetchDoctors();
    fetchPatientName();
  }, []);

  useEffect(() => {
    const fetchAvailableDates = async () => {
      if (selectedDoctor) {
        try {
          const response = await axios.get(`http://localhost:5000/api/availability?doctorId=${selectedDoctor._id}`);
          const datesWithAvailability = response.data.map(item => new Date(item.day));
          setAvailableDates(datesWithAvailability);
        } catch (error) {
          console.error('Error fetching available dates:', error);
        }
      }
    };

    fetchAvailableDates();
  }, [selectedDoctor]);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (selectedDoctor && selectedDate) {
        const formattedDate = selectedDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        try {
          const response = await axios.get(`http://localhost:5000/api/availability?doctorId=${selectedDoctor._id}&date=${formattedDate}`);
          setAvailableSlots(response.data?.slots || []);
        } catch (error) {
          console.error('Error fetching available slots:', error);
        }
      }
    };

    fetchAvailableSlots();
  }, [selectedDoctor, selectedDate]);

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
      const dayDate = new Date(year, month, i);
      days.push(
        <span
          key={i}
          onClick={() => handleDateChange(i)}
          className={`day ${
            selectedDate && selectedDate.getDate() === i && selectedDate.getMonth() === month && selectedDate.getFullYear() === year ? 'selected' : ''
          } ${availableDates.some(d => d.toDateString() === dayDate.toDateString()) ? 'available' : ''}`}
        >
          {i}
        </span>
      );
    }

    return days;
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDateTimeSection(false);
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
  
  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('appointmentDetails');
    // Redirect to sign-in page
    navigate('/sign-in');
  };

  return (
    <div className="appointment-booking">
      <div className="top-menu">
        <h2>Welcome {patientName}!</h2>
        <div className="buttons">
          <button className="appointment_btn">Appointments</button>
          <button className="appointment_btn">Walk-In</button>
          <button className="appointment_btn" onClick={handleLogout}>Logout</button>
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
                    {availableSlots.length > 0 ? (
                      availableSlots.map((slot, index) => (
                        <button
                          key={index}
                          className={selectedTime === slot.startTime ? 'active' : ''}
                          onClick={() => handleTimeSelect(slot.startTime)}
                        >
                          {slot.startTime} - {slot.endTime}
                        </button>
                      ))
                    ) : (
                      <p>No slots available for the selected date.</p>
                    )}
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
