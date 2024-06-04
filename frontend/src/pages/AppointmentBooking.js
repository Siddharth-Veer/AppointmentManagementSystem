import React, { useState } from 'react';
import '../css/AppointmentBooking.css';

const AppointmentBooking = () => {
    const [doctor, setDoctor] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ doctor, date, time, reason });
    };

    return (
        <div className="appointment-container">
            <h1>Book an Appointment</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="doctor">Select Doctor:</label>
                    <select id="doctor" value={doctor} onChange={(e) => setDoctor(e.target.value)} required>
                        <option value="">--Please choose an option--</option>
                        <option value="dr_smith">Dr. Smith</option>
                        <option value="dr_jones">Dr. Jones</option>
                        <option value="dr_doe">Dr. Doe</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Select Date:</label>
                    <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="time">Select Time:</label>
                    <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="reason">Reason for Appointment:</label>
                    <textarea id="reason" value={reason} onChange={(e) => setReason(e.target.value)} rows="4" required></textarea>
                </div>
                <button type="submit">Book Appointment</button>
            </form>
        </div>
    );
};

export default AppointmentBooking;
