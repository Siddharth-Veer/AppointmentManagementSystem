import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Card, Modal, Table } from 'react-bootstrap';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [newDate, setNewDate] = useState(new Date());
  const navigate = useNavigate();

  const doctorName = sessionStorage.getItem('doctorName');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('https://medisync-w9rq.onrender.com/api/appointments', {
          params: {
            doctorName: doctorName,
          },
        });
        const appointmentsData = response.data;

        const formattedDate = selectedDate.toISOString().split('T')[0];
        const filteredAppointments = appointmentsData.filter(
          appointment => {
            const appointmentDate = new Date(appointment.date);
            return !isNaN(appointmentDate.getTime()) &&
              appointmentDate.toISOString().split('T')[0] === formattedDate;
          }
        );

        setAppointments(filteredAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [selectedDate, doctorName]);

  const handleAppointmentSelect = (appointment) => {
    setSelectedAppointment(appointment);
    setNewDate(new Date(appointment.date)); // Initialize newDate with the current date of the selected appointment
  };

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setSelectedDate(newDate);
  };

  const handleNewDateChange = (e) => {
    const date = new Date(e.target.value);
    setNewDate(date);
    fetchSlots(); // Fetch slots on date change
  };

  const fetchSlots = async () => {
    // Generate time slots from 9 AM to 7 PM
    const startHour = 9;
    const endHour = 19;
    const slotsArray = [];

    for (let hour = startHour; hour <= endHour; hour++) {
      const time = `${hour}:00`;
      slotsArray.push({ time });
    }

    // Exclude the current slot from the list
    const currentSlot = selectedAppointment?.time;
    const availableSlots = slotsArray.filter(slot => slot.time !== currentSlot);

    setSlots(availableSlots);
    setShowRescheduleModal(true);
  };

  const handleSlotSelect = (e) => {
    setSelectedSlot(e.target.value);
  };

  const handleReschedule = async () => {
    if (selectedAppointment && newDate && selectedSlot) {
      try {
        const response = await axios.put(`https://medisync-w9rq.onrender.com/api/appointments/${selectedAppointment._id}`, {
          date: newDate.toISOString().split('T')[0],
          time: selectedSlot
        });
        if (response.status === 200) {
          alert('Appointment rescheduled successfully');
          setAppointments(prevAppointments =>
            prevAppointments.map(appointment =>
              appointment._id === selectedAppointment._id
                ? { ...appointment, date: newDate.toISOString().split('T')[0], time: selectedSlot }
                : appointment
            )
          );
          setShowRescheduleModal(false);
          setSelectedAppointment(null);
        }
      } catch (error) {
        console.error('Error rescheduling appointment:', error);
        alert('Failed to reschedule the appointment.');
      }
    } else {
      alert('Please select a date and a slot.');
    }
  };

  const handleCompleteButtonClick = async () => {
    if (selectedAppointment) {
      try {
        const response = await axios.put(`https://medisync-w9rq.onrender.com/api/appointments/${selectedAppointment._id}`, {
          status: 'Complete'
        });
        if (response.status === 200) {
          alert('Appointment marked as complete');
          setAppointments(prevAppointments =>
            prevAppointments.map(appointment =>
              appointment._id === selectedAppointment._id
                ? { ...appointment, status: 'Complete' }
                : appointment
            )
          );
          setSelectedAppointment(null);
        }
      } catch (error) {
        console.error('Error completing appointment:', error);
        alert(`Failed to complete the appointment: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/doctor-signin');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'green';
      case 'Complete':
        return 'red';
      default:
        return 'black';
    }
  };

  return (
    <Container fluid className="doctor-dashboard-container p-4">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">Medisync</h1>
        <div className="d-flex align-items-center">
          <span className="me-3">{`${doctorName}`}</span>
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </div>
      </header>

      <Row className="dashboard-content g-4">
        <Col md={3}>
          <Card className="p-3">
            <Form.Group controlId="datePicker">
              <Form.Label>Select Date</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate.toISOString().substr(0, 10)}
                onChange={handleDateChange}
              />
            </Form.Group>
          </Card>
        </Col>

        <Col md={9}>
          <Card className="p-3">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(appointment => (
                  <tr key={appointment._id}>
                    <td>{appointment.patientName}</td>
                    <td>{new Date(appointment.date).toLocaleDateString()}</td>
                    <td>{appointment.time}</td>
                    <td style={{ color: getStatusColor(appointment.status) }}>
                      {appointment.status}
                    </td>
                    <td>
                      <Button variant="primary" onClick={() => handleAppointmentSelect(appointment)}>Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>

        <Col md={12}>
          {selectedAppointment && (
            <Modal show={true} onHide={() => setSelectedAppointment(null)}>
              <Modal.Header closeButton>
                <Modal.Title>Appointment Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p><strong>Patient:</strong> {selectedAppointment.patientName}</p>
                <p><strong>Date:</strong> {new Date(selectedAppointment.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {selectedAppointment.time}</p>
                <p><strong>Status:</strong> <span style={{ color: getStatusColor(selectedAppointment.status) }}>{selectedAppointment.status}</span></p>
                <Button variant="primary" onClick={() => fetchSlots()}>Reschedule</Button>
                <Button variant="success" className="mt-2" onClick={handleCompleteButtonClick}>Complete</Button>
              </Modal.Body>
            </Modal>
          )}
        </Col>
      </Row>

      {/* Reschedule Modal */}
      <Modal show={showRescheduleModal} onHide={() => setShowRescheduleModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reschedule Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="rescheduleDate">
            <Form.Label>Select New Date</Form.Label>
            <Form.Control
              type="date"
              value={newDate.toISOString().split('T')[0]}
              onChange={handleNewDateChange}
            />
          </Form.Group>
          <Form.Group controlId="rescheduleSlot">
            <Form.Label>Select Slot</Form.Label>
            <Form.Control as="select" value={selectedSlot} onChange={handleSlotSelect}>
              <option value="">Select a slot</option>
              {slots.map(slot => (
                <option key={slot.time} value={slot.time}>{slot.time}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRescheduleModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleReschedule}>Reschedule</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DoctorDashboard;
