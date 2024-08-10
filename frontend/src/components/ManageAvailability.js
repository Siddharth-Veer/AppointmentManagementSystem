import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/ManageAvailability.css'; // Import custom CSS for layout

const ManageAvailability = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [availableDates, setAvailableDates] = useState([]); // Track available dates

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
    const fetchAvailableDates = async () => {
      if (selectedDoctor) {
        try {
          const response = await axios.get(`http://localhost:5000/api/availability?doctorId=${selectedDoctor}`);
          const datesWithAvailability = response.data.map(item => new Date(item.day));
          setAvailableDates(datesWithAvailability);
          setHasSlots(response.data.length > 0); // Check if there are slots
        } catch (error) {
          console.error('Error fetching available dates:', error);
        }
      }
    };
    fetchAvailableDates();
  }, [selectedDoctor]);

  useEffect(() => {
    // Fetch time slots for the selected date
    const fetchAvailability = async () => {
      if (selectedDoctor) {
        try {
          const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
          const response = await axios.get(`http://localhost:5000/api/availability?doctorId=${selectedDoctor}&date=${formattedDate}`);
          setTimeSlots(response.data?.slots || generateTimeSlots());
        } catch (error) {
          console.error('Error fetching availability:', error);
        }
      }
    };
    fetchAvailability();
  }, [selectedDoctor, date]);

  const generateTimeSlots = () => {
    const slots = [];
    let startTime = new Date();
    startTime.setHours(9, 0, 0); // Start at 9 AM

    while (startTime.getHours() < 18) { // Until 6 PM
      const endTime = new Date(startTime);
      endTime.setHours(startTime.getHours() + 1);

      slots.push({
        startTime: startTime.toTimeString().substr(0, 5),
        endTime: endTime.toTimeString().substr(0, 5),
        isAvailable: true
      });

      startTime = endTime;
    }
    return slots;
  };

  const handleSave = async () => {
    try {
      const formattedDate = date.toISOString().split('T')[0];
      await axios.post('http://localhost:5000/api/availability', {
        doctorId: selectedDoctor,
        day: formattedDate,
        slots: timeSlots
      });
      alert('Availability saved successfully!');
      // Update available dates
      setAvailableDates(prevDates => {
        const newDate = new Date(formattedDate);
        return [...prevDates.filter(d => d.toDateString() !== newDate.toDateString()), newDate];
      });
    } catch (error) {
      console.error('Error saving availability:', error);
      alert('Failed to save availability.');
    }
  };

  const handleSetAvailability = (type) => {
    let newSlots = [];
    if (type === 'allDay') {
      newSlots = generateTimeSlots();
    } else if (type === 'morning') {
      newSlots = generateTimeSlots().filter(slot => slot.startTime >= '09:00' && slot.endTime <= '13:00');
    } else if (type === 'afternoon') {
      newSlots = generateTimeSlots().filter(slot => slot.startTime >= '14:00' && slot.endTime <= '18:00');
    }
    setTimeSlots(newSlots);
  };

  const isDateAvailable = (date) => {
    return availableDates.some(d => d.toDateString() === date.toDateString());
  };

  return (
    <div className="manage-availability-container">
      <div className="calendar-container">
        <h2>Select Date:</h2>
        <Calendar
          onChange={setDate}
          value={date}
          tileClassName={({ date }) => isDateAvailable(date) ? 'available-date' : null} // Highlight available dates
          onClickDay={setDate} // Set date on click
        />
      </div>
      <div className="details-container">
        <h2>Manage Doctor Availability</h2>
        <select onChange={(e) => setSelectedDoctor(e.target.value)} value={selectedDoctor}>
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor._id}>
              {doctor.name}
            </option>
          ))}
        </select>
        {selectedDoctor && (
          <div>
            <div>
              <button onClick={() => handleSetAvailability('allDay')}>Available All Day</button>
              <button onClick={() => handleSetAvailability('morning')}>Available in the Morning</button>
              <button onClick={() => handleSetAvailability('afternoon')}>Available in the Afternoon</button>
            </div>
            <div className="time-slots-container">
              <label>Time Slots:</label>
              <div className="time-slots-grid">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    className={`time-slot-button ${slot.isAvailable ? 'available' : 'unavailable'}`}
                    onClick={() => {
                      const newSlots = [...timeSlots];
                      newSlots[index].isAvailable = !newSlots[index].isAvailable;
                      setTimeSlots(newSlots);
                    }}
                  >
                    {slot.startTime} - {slot.endTime}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={handleSave}>Save Availability</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAvailability;
