import React, { useState, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import '../css/DoctorPage.css'; // Custom CSS for additional styling

const localizer = momentLocalizer(moment);

const mockAppointments = [
  {
    _id: '1',
    date: new Date(2024, 6, 31, 9, 0),
    time: '9:00 AM',
    patientName: 'Mrs. Fischer',
    speciality: 'Dermatology',
    contact: '650-299-9555',
  },
  {
    _id: '2',
    date: new Date(2024, 6, 31, 10, 0),
    time: '10:00 AM',
    patientName: 'Mark Leandro',
    speciality: 'Cardiology',
    contact: '650-543-7654',
  },
  {
    _id: '3',
    date: new Date(2024, 6, 31, 11, 0),
    time: '11:00 AM',
    patientName: 'Margret Gonzalez',
    speciality: 'Neurology',
    contact: '650-789-8654',
  },
  // Add more mock appointments as needed
];

const DoctorPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(moment().format('M')); // Default to current month
  const [selectedYear, setSelectedYear] = useState(moment().format('YYYY')); // Default to current year
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setViewDate(start);
  };

  const getAppointmentsForSelectedDate = () => {
    if (!selectedDate) return [];
    return mockAppointments.filter(appointment =>
      moment(appointment.date).isSame(selectedDate, 'day')
    );
  };

  const handleDone = (appointmentId) => {
    console.log(`Appointment ${appointmentId} marked as done.`);
    // Implement actual "done" logic here
  };

  const handleReschedule = (appointmentId) => {
    const appointment = mockAppointments.find(app => app._id === appointmentId);
    if (appointment) {
      setSelectedAppointment(appointment);
      // Simulate fetching available slots
      setAvailableSlots([
        { time: '1:00 PM' },
        { time: '2:00 PM' },
        { time: '3:00 PM' },
      ]);
      setShowRescheduleModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowRescheduleModal(false);
    setSelectedAppointment(null);
    setAvailableSlots([]);
  };

  const handleRescheduleSlot = (newTime) => {
    console.log(`Appointment ${selectedAppointment._id} rescheduled to ${newTime}.`);
    // Implement actual reschedule logic here
    handleCloseModal();
  };

  const calendarEvents = mockAppointments.map(appointment => ({
    title: appointment.patientName,
    start: appointment.date,
    end: appointment.date,
  }));

  // Custom Toolbar Component
  const CustomToolbar = ({ label, onNavigate, onView }) => {
    const handlePrev = useCallback(() => {
      onNavigate('PREV');
    }, [onNavigate]);

    const handleNext = useCallback(() => {
      onNavigate('NEXT');
    }, [onNavigate]);

    const handleToday = useCallback(() => {
      onNavigate('TODAY');
      setViewDate(new Date());
    }, [onNavigate]);

    const handleMonthChange = (e) => {
      const month = e.target.value;
      setSelectedMonth(month);
      setViewDate(moment(viewDate).month(month - 1).startOf('month').toDate());
    };

    const handleYearChange = (e) => {
      const year = e.target.value;
      setSelectedYear(year);
      setViewDate(moment(viewDate).year(year).startOf('month').toDate());
    };

    const goToMonthView = () => {
      onView('month');
      setViewDate(moment().startOf('month').toDate());
    };

    const currentLabel = moment(label).format('MMMM YYYY');
    const currentMonthYear = `${moment(viewDate).format('MMMM YYYY')}`;

    return (
      <div>
        <br />
        <button onClick={goToMonthView}>Month</button>
        <div className="rbc-toolbar-label">
          <span>{currentMonthYear}</span>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="rbc-toolbar-select"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {moment().month(i).format('MMMM')}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="rbc-toolbar-select"
          >
            {Array.from({ length: 5 }, (_, i) => (
              <option key={i + 1} value={moment().year() + i - 2}>
                {moment().year() + i - 2}
              </option>
            ))}
          </select>
        </div>
        <div className="rbc-toolbar-custom">
          <button className="rbc-toolbar-button" onClick={handlePrev}>Prev</button>
          <button className="rbc-toolbar-button" onClick={handleToday}>Today</button>
          <button className="rbc-toolbar-button" onClick={handleNext}>Next</button>
        </div>
      </div>
    );
  };

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="container-fluid">
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/doctor-page">Doctor Page</a></li>
        </ul>
      </nav>

      <div className="row">
        <div className="col-md-4" id="calendar-column">
          <h2>Calendar</h2>
          <div className="calendar">
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 400 }}
              selectable
              onSelectSlot={handleSelectSlot}
              date={viewDate}
              onNavigate={(date) => setViewDate(date)} // Set onNavigate handler
              components={{
                toolbar: CustomToolbar // Use the custom toolbar
              }}
              views={['month', 'week', 'day']} // Ensure month view is available
            />
          </div>
        </div>
        <div className="col-md-8" id="details-column">
          <h2>
            Appointments for {selectedDate ? moment(selectedDate).format('MMMM Do YYYY') : 'Selected date'}
          </h2>
          <ul className="list-group">
            {getAppointmentsForSelectedDate().map((appointment) => (
              <li 
                key={appointment._id} 
                className="list-group-item"
                onClick={() => handleAppointmentClick(appointment)}
              >
                <strong>{appointment.time}</strong> - {appointment.patientName} ({appointment.speciality})
                <p>Contact: {appointment.contact}</p>
                
                <div className="appointment-actions">
                  <button 
                    className="btn btn-success" 
                    onClick={(e) => { e.stopPropagation(); handleDone(appointment._id); }}>
                    Done
                  </button>
                  <button 
                    className="btn btn-warning" 
                    onClick={(e) => { e.stopPropagation(); handleReschedule(appointment._id); }}>
                    Reschedule
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      <Modal show={showDetailModal} onHide={handleCloseDetailModal}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <>
              <p><strong>Time:</strong> {selectedAppointment.time}</p>
              <p><strong>Patient Name:</strong> {selectedAppointment.patientName}</p>
              <p><strong>Speciality:</strong> {selectedAppointment.speciality}</p>
              <p><strong>Contact:</strong> {selectedAppointment.contact}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Reschedule Modal */}
      <Modal show={showRescheduleModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reschedule Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <>
              <p><strong>Current Time:</strong> {selectedAppointment.time}</p>
              <p><strong>Patient Name:</strong> {selectedAppointment.patientName}</p>
              <p><strong>Speciality:</strong> {selectedAppointment.speciality}</p>
              <p><strong>Contact:</strong> {selectedAppointment.contact}</p>
            </>
          )}
          <h5>Available Slots:</h5>
          <ul className="list-group">
            {availableSlots.map((slot, index) => (
              <li 
                key={index} 
                className="list-group-item"
                onClick={() => handleRescheduleSlot(slot.time)}
              >
                {slot.time}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DoctorPage;
