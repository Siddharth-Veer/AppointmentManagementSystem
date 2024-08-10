import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserIcon, PowerIcon } from '@heroicons/react/24/outline';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import '../css/DoctorPage.css';

const localizer = momentLocalizer(moment);

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [weekStart, setWeekStart] = useState(moment().startOf('week').toDate());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments');
        const appointmentsData = response.data;
        const filteredAppointments = appointmentsData.filter(appointment => 
          new Date(appointment.date).toDateString() === new Date(selectedDate).toDateString()
        );
        const formattedEvents = filteredAppointments.map((appointment) => ({
          id: appointment._id,
          title: appointment.patientName || 'No Title',
          start: new Date(`${appointment.date}T${appointment.time}`),
          end: new Date(new Date(`${appointment.date}T${appointment.time}`).getTime() + 30 * 60000), // assuming 30-minute appointments
        }));
        setAppointments(filteredAppointments);
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [selectedDate]);

  useEffect(() => {
    // Fetch appointments when weekStart changes
    const fetchAppointmentsForWeek = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments', {
          params: {
            start: weekStart.toISOString(),
            end: moment(weekStart).endOf('week').toISOString(),
          },
        });
        const appointmentsData = response.data;
        const filteredAppointments = appointmentsData.filter(appointment => 
          new Date(appointment.date).toDateString() === new Date(selectedDate).toDateString()
        );
        const formattedEvents = filteredAppointments.map((appointment) => ({
          id: appointment._id,
          title: appointment.patientName || 'No Title',
          start: new Date(`${appointment.date}T${appointment.time}`),
          end: new Date(new Date(`${appointment.date}T${appointment.time}`).getTime() + 30 * 60000), // assuming 30-minute appointments
        }));
        setAppointments(filteredAppointments);
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointmentsForWeek();
  }, [weekStart, selectedDate]);

  const handleAppointmentSelect = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setSelectedDate(newDate);
    const newWeekStart = moment(newDate).startOf('week').toDate();
    setWeekStart(newWeekStart);
  };

  const handleWeekChange = (e) => {
    const newStartOfWeek = moment(e.target.value).startOf('week').toDate();
    setWeekStart(newStartOfWeek);
  };

  const handleReschedule = async () => {
    if (selectedAppointment && selectedDate) {
      try {
        const response = await axios.put(`http://localhost:5000/api/appointments/${selectedAppointment._id}`, {
          date: selectedDate.toLocaleDateString(),
        });
        if (response.status === 200) {
          alert('Appointment rescheduled successfully');
          setAppointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
              appointment._id === selectedAppointment._id
                ? { ...appointment, date: selectedDate.toLocaleDateString() }
                : appointment
            )
          );
          setSelectedAppointment(null); // Clear the selected appointment
        }
      } catch (error) {
        console.error('Error rescheduling appointment:', error);
        alert('Failed to reschedule the appointment.');
      }
    } else {
      alert('Please select an appointment and a new date.');
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/appointments/${appointmentId}`);
      if (response.status === 200) {
        alert('Appointment cancelled successfully');
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment._id !== appointmentId)
        );
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert('Failed to cancel the appointment.');
    }
  };

  // Get doctor's name from session storage
  const doctorName = sessionStorage.getItem('doctorName') || 'Doctor';

  return (
    <div className="doctor-dashboard-container">
      <header className="dashboard-header">
        <div className="logo">Medisync</div>
        <div className="doctor-info">
          <UserIcon className="icon" />
          <span>{`Dr. ${doctorName}`}</span>
        </div>
        <button onClick={() => navigate('/doctor-signin')} className="logout-button">
          <PowerIcon className="icon" />
        </button>
      </header>

      <div className="dashboard-content">
        <aside className="sidebar">
          <input
            type="week"
            value={moment(weekStart).format('YYYY-WW')}
            onChange={handleWeekChange}
            className="week-picker"
          />
          <input
            type="date"
            value={selectedDate.toISOString().substr(0, 10)}
            onChange={handleDateChange}
            className="date-picker"
          />
        </aside>

        <main className="calendar">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, width: '100%' }}
            views={['week']}
            onSelectEvent={handleAppointmentSelect}
            defaultView="week"
            date={selectedDate}
          />
        </main>

        <aside className="appointment-details">
          {selectedAppointment && (
            <>
              <h2>Appointment Details</h2>
              <p>Patient: {selectedAppointment.patientName}</p>
              <p>Date: {selectedAppointment.date}</p>
              <p>Time: {selectedAppointment.time}</p>
              <button onClick={handleReschedule} className="reschedule-button">Reschedule</button>
              <button onClick={() => handleCancel(selectedAppointment._id)} className="cancel-button">Cancel</button>
            </>
          )}
        </aside>
      </div>
    </div>
  );
};

export default DoctorDashboard;
