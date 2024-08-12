import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included

const ManageAvailability = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [date, setDate] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://medisync-w9rq.onrender.com/api/doctors');
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
          const response = await axios.get(`https://medisync-w9rq.onrender.com/api/availability?doctorId=${selectedDoctor}`);
          const datesWithAvailability = response.data.map(item => new Date(item.day).toISOString().split('T')[0]);
          setAvailableDates(datesWithAvailability);
        } catch (error) {
          console.error('Error fetching available dates:', error);
        }
      }
    };
    fetchAvailableDates();
  }, [selectedDoctor]);

  useEffect(() => {
    const fetchAvailability = async () => {
      if (selectedDoctor && date) {
        try {
          const response = await axios.get(`https://medisync-w9rq.onrender.com/api/availability?doctorId=${selectedDoctor}&date=${date}`);
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
    startTime.setHours(9, 0, 0);

    while (startTime.getHours() < 18) {
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
      await axios.post('https://medisync-w9rq.onrender.com/api/availability', {
        doctorId: selectedDoctor,
        day: date,
        slots: timeSlots
      });
      alert('Availability saved successfully!');
      setAvailableDates(prevDates => {
        const newDate = new Date(date).toISOString().split('T')[0];
        return [...prevDates.filter(d => d !== newDate), newDate];
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

  const isDateAvailable = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && availableDates.includes(date.toISOString().split('T')[0]);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4 mb-4">
          <h2>Select Date:</h2>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`form-control ${isDateAvailable(date) ? 'bg-success text-white' : ''}`} // Highlight available dates
          />
        </div>
        <div className="col-md-8">
          <h2>Manage Doctor Availability</h2>
          <div className="mb-3">
            <select 
              onChange={(e) => setSelectedDoctor(e.target.value)} 
              value={selectedDoctor}
              className="form-select"
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
          {selectedDoctor && (
            <div>
              <div className="mb-3">
                <button 
                  className="btn btn-primary me-2"
                  onClick={() => handleSetAvailability('allDay')}
                >
                  Available All Day
                </button>
                <button 
                  className="btn btn-secondary me-2"
                  onClick={() => handleSetAvailability('morning')}
                >
                  Available in the Morning
                </button>
                <button 
                  className="btn btn-warning"
                  onClick={() => handleSetAvailability('afternoon')}
                >
                  Available in the Afternoon
                </button>
              </div>
              <div className="mb-3">
                <label className="form-label">Time Slots:</label>
                <div className="row row-cols-3 g-2">
                  {timeSlots.map((slot, index) => (
                    <div className="col" key={index}>
                      <button
                        className={`btn w-100 ${slot.isAvailable ? 'btn-success' : 'btn-danger'}`}
                        onClick={() => {
                          const newSlots = [...timeSlots];
                          newSlots[index].isAvailable = !newSlots[index].isAvailable;
                          setTimeSlots(newSlots);
                        }}
                      >
                        {slot.startTime} - {slot.endTime}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <button className="btn btn-primary" onClick={handleSave}>Save Availability</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageAvailability;
