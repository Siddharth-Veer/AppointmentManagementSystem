import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, ListGroup, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppointmentBooking = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [showDateTimeSection, setShowDateTimeSection] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [symptomQuery, setSymptomQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSymptomChange = (e) => {
    const query = e.target.value;
    setSymptomQuery(query);

    if (query) {
      const filteredSymptoms = symptoms.filter(symptom =>
        symptom.symptom.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSymptoms);
    } else {
      setSuggestions([]);
    }
  };

  const handleSymptomSelect = (symptom) => {
    setSymptomQuery(symptom.symptom);
    setSuggestions([]);
    const specialty = symptom.speciality;
    setSelectedSpecialty(specialty);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://medisync-w9rq.onrender.com/api/doctors');
        setDoctors(response.data);
        const uniqueSpecialties = [...new Set(response.data.map(doctor => doctor.speciality))];
        setSpecialties(uniqueSpecialties);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    const fetchSymptoms = async () => {
      try {
        const response = await axios.get('https://medisync-w9rq.onrender.com/api/symptoms');
        setSymptoms(response.data);
      } catch (error) {
        console.error('Error fetching symptoms:', error);
      }
    };

    const fetchPatientName = () => {
      const userName = sessionStorage.getItem('userName');
      setPatientName(userName || 'Guest');
    };

    // Load symptom from session storage and set it to the input field
    const storedSymptom = sessionStorage.getItem('selectedSymptom');
    if (storedSymptom) {
      setSymptomQuery(storedSymptom);
      handleSymptomChange({ target: { value: storedSymptom } });
    }

    fetchDoctors();
    fetchSymptoms();
    fetchPatientName();
  }, []);

  useEffect(() => {
    const filterDoctors = () => {
      let filtered = doctors;

      // Filter by specialty
      if (selectedSpecialty) {
        filtered = filtered.filter(doctor => doctor.speciality === selectedSpecialty);
      }

      // Filter by symptoms
      if (symptomQuery) {
        const matchedSpecialties = symptoms
          .filter(symptom => symptom.symptom.toLowerCase().includes(symptomQuery.toLowerCase()))
          .map(symptom => symptom.speciality);

        filtered = filtered.filter(doctor => matchedSpecialties.includes(doctor.speciality));
      }

      setFilteredDoctors(filtered);
    };

    filterDoctors();
  }, [selectedSpecialty, symptomQuery, doctors, symptoms]);
  useEffect(() => {
    const fetchAvailableDates = async () => {
      if (selectedDoctor) {
        try {
          const response = await axios.get(`https://medisync-w9rq.onrender.com/api/availability?doctorId=${selectedDoctor._id}`);
          const data = response.data;
          if (Array.isArray(data)) {
            const datesWithAvailability = data.map(item => new Date(item.day));
            setAvailableDates(datesWithAvailability);
          } else {
            console.error('Expected an array but received:', data);
          }
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
        const formattedDate = selectedDate.toISOString().split('T')[0];
        try {
          const response = await axios.get(`https://medisync-w9rq.onrender.com/api/availability?doctorId=${selectedDoctor._id}&date=${formattedDate}`);
          setAvailableSlots(response.data?.slots || []);
        } catch (error) {
          console.error('Error fetching available slots:', error);
        }
      }
    };

    fetchAvailableSlots();
  }, [selectedDoctor, selectedDate]);

  const handleDateChange = useCallback((day) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
  }, [currentYear, currentMonth]);

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
        const response = await axios.post('https://medisync-w9rq.onrender.com/api/appointments', appointmentDetails);
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

  const populateDays = useCallback((year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    
    // Add empty slots for the days of the previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }
  
    // Add the days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(year, month, i);
      days.push(
        <div
          key={i}
          onClick={() => handleDateChange(i)}
          className={`day p-2 text-center ${
            selectedDate && selectedDate.getDate() === i && selectedDate.getMonth() === month && selectedDate.getFullYear() === year ? 'selected bg-primary text-white' : 'bg-light'
          } ${availableDates.some(d => d.toDateString() === dayDate.toDateString()) ? 'available' : ''}`}
          style={{ flex: '1 0 14%' }} // 14% to fit 7 items per row
          aria-selected={selectedDate && selectedDate.getDate() === i}
        >
          {i}
        </div>
      );
    }
  
    return days;
  }, [selectedDate, availableDates, handleDateChange]);
  

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

  return (
    <Container className="appointment-booking mt-4">
      <Row className="mb-4">
        <Col>
          <h2>Welcome, {patientName}!</h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" className="me-2" onClick={() => navigate('/appointments')}>Appointments</Button>
          <Button variant="secondary" className="me-2" onClick={() => navigate('/walk-in')}>Walk-In</Button>
          <Button variant="danger" onClick={() => navigate('/sign-in')}>Logout</Button>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Search Symptoms</Card.Title>
              <Form.Group controlId="symptomSearch">
                <Form.Control
                  type="text"
                  placeholder="Enter symptoms to search"
                  value={symptomQuery}
                  onChange={handleSymptomChange}
                />
                {suggestions.length > 0 && (
                  <ListGroup className="mt-2">
                    {suggestions.map((symptom) => (
                      <ListGroup.Item
                        key={symptom._id}
                        action
                        onClick={() => handleSymptomSelect(symptom)}
                      >
                        {symptom.symptom}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Form.Group>
              <Card.Title className="mt-3">Select a Doctor</Card.Title>
              <Form.Group controlId="specialtyFilter">
                <Form.Label>Filter by Specialty</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  <option value="">All Specialties</option>
                  {specialties.map((specialty, index) => (
                    <option key={index} value={specialty}>{specialty}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              {filteredDoctors.length > 0 && (
                <ListGroup className="mt-3">
                  {filteredDoctors.map((doctor) => (
                    <ListGroup.Item
                      key={doctor._id}
                      action
                      onClick={() => handleDoctorSelect(doctor)}
                    >
                      {doctor.name}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          {selectedDoctor && (
            <>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Doctor's Details</Card.Title>
                  <Card.Title>{selectedDoctor.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{selectedDoctor.speciality}</Card.Subtitle>
                  <Card.Text>Contact: {selectedDoctor.contact}</Card.Text>
                  <Button variant="primary" onClick={handleSelectClick}>Select Doctor</Button>
                </Card.Body>
              </Card>
            </>
          )}

          {showDateTimeSection && (
            <>
              <Card className="mb-4">
  <Card.Body>
    <Card.Title>Select Date</Card.Title>
    <div className="calendar">
      <div className="calendar-header d-flex justify-content-between">
        <Button variant="link" onClick={handlePrevMonth}>&lt;</Button>
        <span>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <Button variant="link" onClick={handleNextMonth}>&gt;</Button>
      </div>
      <div className="calendar-grid d-flex flex-wrap">
        {populateDays(currentYear, currentMonth)}
      </div>
    </div>
  </Card.Body>
</Card>

              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Select Time Slot</Card.Title>
                  {availableSlots.length === 0 ? (
                    <p>No available slots for the selected date.</p>
                  ) : (
                    <ListGroup>
                      {availableSlots.map((slot, index) => (
                        <ListGroup.Item
                          key={index}
                          action
                          onClick={() => handleTimeSelect(slot.startTime)} // Ensure you're only passing the startTime as a string
                          active={selectedTime === slot.startTime} // Comparison should also be against the string
                        >
                          {slot.startTime} {/* Render the startTime string */}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>

              <Button variant="success" onClick={handleConfirm}>Confirm Appointment</Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AppointmentBooking;
