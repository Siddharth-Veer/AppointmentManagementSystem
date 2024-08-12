import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container, Row, Col, Button, Form, Card, Modal } from 'react-bootstrap';

const localizer = momentLocalizer(moment);

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [weekStart, setWeekStart] = useState(moment().startOf('week').toDate());
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('https://medisync-w9rq.onrender.com/api/appointments');
        const appointmentsData = response.data;
  
        // Ensure date format is consistent
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const filteredAppointments = appointmentsData.filter(
          appointment => new Date(appointment.date).toISOString().split('T')[0] === formattedDate
        );
  
        const formattedEvents = filteredAppointments.map(appointment => ({
          id: appointment._id,
          title: appointment.patientName || 'No Title',
          start: new Date(`${appointment.date}T${appointment.time}`),
          end: new Date(new Date(`${appointment.date}T${appointment.time}`).getTime() + 30 * 60000),
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
    const fetchAppointmentsForWeek = async () => {
      try {
        const response = await axios.get('https://medisync-w9rq.onrender.com/api/appointments', {
          params: {
            start: weekStart.toISOString(),
            end: moment(weekStart).endOf('week').toISOString(),
          },
        });
        const appointmentsData = response.data;
        const filteredAppointments = appointmentsData.filter(
          appointment => new Date(appointment.date).toDateString() === new Date(selectedDate).toDateString()
        );
        const formattedEvents = filteredAppointments.map(appointment => {
          const start = new Date(`${appointment.date}T${appointment.time}`);
          const end = new Date(start.getTime() + 30 * 60000);
          return {
            id: appointment._id,
            title: appointment.patientName || 'No Title',
            start,
            end,
          };
        });
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
        const response = await axios.put(`https://medisync-w9rq.onrender.com/api/appointments/${selectedAppointment._id}`, {
          date: selectedDate.toLocaleDateString(),
        });
        if (response.status === 200) {
          alert('Appointment rescheduled successfully');
          setAppointments(prevAppointments =>
            prevAppointments.map(appointment =>
              appointment._id === selectedAppointment._id
                ? { ...appointment, date: selectedDate.toLocaleDateString() }
                : appointment
            )
          );
          setSelectedAppointment(null);
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
      const response = await axios.delete(`https://medisync-w9rq.onrender.com/api/appointments/${appointmentId}`);
      if (response.status === 200) {
        alert('Appointment cancelled successfully');
        setAppointments(prevAppointments =>
          prevAppointments.filter(appointment => appointment._id !== appointmentId)
        );
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert('Failed to cancel the appointment.');
    }
  };

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get(`https://medisync-w9rq.onrender.com/api/available-slots`, {
        params: {
          date: selectedDate.toISOString().split('T')[0],
          doctorId: sessionStorage.getItem('doctorId') // Assuming doctor ID is stored in session storage
          
        }
      });
      const slots = response.data;
      // console logg all the availabel slots in the console
      console.log(slots);
      setAvailableSlots(slots);
      setShowRescheduleModal(true);
    } catch (error) {
      console.error('Error fetching available slots:', error);
      
    }
  };

  const handleRescheduleButtonClick = () => {
    fetchAvailableSlots();
  };

  const handleSlotSelect = async (slot) => {
    if (selectedAppointment) {
      try {
        await axios.put(`https://medisync-w9rq.onrender.com/api/appointments/${selectedAppointment._id}`, {
          date: selectedDate.toLocaleDateString(),
          time: slot.time
        });
        alert('Appointment rescheduled successfully');
        setShowRescheduleModal(false);
        setSelectedAppointment(null);
        // Refresh appointments
        setAppointments(prevAppointments =>
          prevAppointments.map(appointment =>
            appointment._id === selectedAppointment._id
              ? { ...appointment, date: selectedDate.toLocaleDateString(), time: slot.time }
              : appointment
          )
        );
      } catch (error) {
        console.error('Error rescheduling appointment:', error);
        alert('Failed to reschedule the appointment.');
      }
    }
  };
  const safeDate = (date) => {
    try {
      return new Date(date);
    } catch (error) {
      console.error('Invalid date:', date, error);
      return new Date();
    }
  };
  const handleNavigate = (date) => {
    // Update state or perform actions based on the new date
    setSelectedDate(date);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/doctor-signin');
  };

  const doctorName = sessionStorage.getItem('doctorName') || 'Doctor';

  return (
    <Container fluid className="doctor-dashboard-container p-4">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">Medisync</h1>
        <div className="d-flex align-items-center">
          <span className="me-3">{`Dr. ${doctorName}`}</span>
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </div>
      </header>

      <Row className="dashboard-content g-4">
        <Col md={3}>
          <Card className="p-3">
            <Form.Group controlId="weekPicker">
              <Form.Label>Select Week</Form.Label>
              <Form.Control
  type="week"
  value={moment(weekStart).format('YYYY-[W]WW')}
  onChange={handleWeekChange}
/>
            </Form.Group>
            <Form.Group controlId="datePicker" className="mt-3">
              <Form.Label>Select Date</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate.toISOString().substr(0, 10)}
                onChange={handleDateChange}
              />
            </Form.Group>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="p-3">
            <div className="calendar-wrapper">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                views={['week']}
                onSelectEvent={handleAppointmentSelect}
                defaultView="week"
                min={new Date(2024, 7, 1, 9, 0, 0)} // 9 AM
                max={new Date(2024, 7, 1, 19, 0, 0)} // 7 PM
                date={selectedDate}
                onNavigate={handleNavigate} // Add onNavigate handler
              />
            </div>
          </Card>
        </Col>

        <Col md={3}>
          {selectedAppointment && (
            <Card className="p-3">
              <h2>Appointment Details</h2>
              <p>Patient: {selectedAppointment.patientName}</p>
              <p>Date: {selectedAppointment.date}</p>
              <p>Time: {selectedAppointment.time}</p>
              <Button variant="warning" onClick={handleRescheduleButtonClick} className="me-2">Reschedule</Button>
              <Button variant="danger" onClick={() => handleCancel(selectedAppointment._id)}>Cancel</Button>
            </Card>
          )}
        </Col>
      </Row>

      <Modal show={showRescheduleModal} onHide={() => setShowRescheduleModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reschedule Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Select a new time slot</h5>
          <ul>
            {availableSlots.map(slot => (
              <li key={slot.time}>
                <Button variant="primary" onClick={() => handleSlotSelect(slot)}>{slot.time}</Button>
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default DoctorDashboard;
