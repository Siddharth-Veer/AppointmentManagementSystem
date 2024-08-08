import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/index.css'; 

const SelectDateTime = ({ patientName }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientName = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/user/name');
        
        // Set the patientName state with the fetched data
       
      } catch (error) {
        console.error('Error fetching patient name:', error);
      }
    };

    fetchPatientName();
  }, []);

  const handleDateChange = (day, month, year) => {
    const newDate = new Date(year, month, day);
    setSelectedDate(newDate);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (selectedTime && selectedDoctor) {
      const confirmationDetails = `
        Patient: ${patientName}
        Doctor: ${selectedDoctor.name}
        Speciality: ${selectedDoctor.speciality}
        Contact: ${selectedDoctor.contact}
        Date: ${selectedDate.toLocaleDateString()}
        Time: ${selectedTime}
      `;
      // Display confirmation dialog
      if (window.confirm(`Confirm Appointment?\n\n${confirmationDetails}`)) {
        // Handle confirmation logic here, e.g., send data to server
        navigate('/appointment-confirmation'); // Navigate to appointment confirmation page
      }
    } else {
      alert('Please select both a time slot and a doctor.');
    }
  };

  // Function to populate days in the calendar
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

  // Dummy data for selected doctor (replace with actual logic to select a doctor)
  const dummyDoctor = {
    name: 'Dr. John Doe',
    speciality: 'General Physician',
    contact: '123-456-7890',
  };

  const selectDoctor = () => {
    setSelectedDoctor(dummyDoctor); // Replace with actual logic to select a doctor
  };

  return (
    <div className="appointment-booking">
      <div className="top-menu">
        <h2>Welcome {patientName}!</h2>
        <div className="buttons">
          <button className="appointment_btn">Appointments</button>
          <button className="appointment_btn">Walk-In</button>
          <button className="appointment_btn" onClick={() => navigate('/signin')}>
            Logout
          </button>
        </div>
      </div>
      <div className="appointment-content">
        <div className="appointment-body">
          <div className="left-sidebar">
            <div className="calendar">
              <div className="calendar-header">
                <span>{selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}</span>
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
            {!selectedDoctor ? (
              <div className="doctors-list">
                <h2>Select Doctor</h2>
                {/* Example doctor selection (replace with actual logic) */}
                <div className="doctors-table">
                  <div className="doctors-table-header">
                    <div className="doctors-table-cell">Name</div>
                    <div className="doctors-table-cell">Speciality</div>
                    <div className="doctors-table-cell">Contact</div>
                    <div className="doctors-table-cell"></div>
                  </div>
                  <div className="doctors-table-row" onClick={selectDoctor}>
                    <div className="doctors-table-cell">{dummyDoctor.name}</div>
                    <div className="doctors-table-cell">{dummyDoctor.speciality}</div>
                    <div className="doctors-table-cell">{dummyDoctor.contact}</div>
                    <div className="doctors-table-cell"><button>Select</button></div>
                  </div>
                  {/* Add more doctors as needed */}
                </div>
              </div>
            ) : (
              <div className="appointment-slots">
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
                      className={selectedTime === '3:00 PM' ? 'active' : ''}
                      onClick={() => handleTimeSelect('3:00 PM')}
                    >
                      3:00 PM
                    </button>
                    <button
                      className={selectedTime === '4:00 PM' ? 'active' : ''}
                      onClick={() => handleTimeSelect('4:00 PM')}
                    >
                      4:00 PM
                    </button>
                    <button
                      className={selectedTime === '5:00  PM' ? 'active' : ''}
                      onClick={() => handleTimeSelect('5:00 PM')}
                    >
                      5:00 PM
                    </button>
                  </div>
                </div>
                <div className="confirm-button">
                  <button onClick={handleConfirm} disabled={!selectedTime}>
                    Confirm Appointment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectDateTime;

