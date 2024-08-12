import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Table, Button, Badge, Alert } from 'react-bootstrap';

const AdminDoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setError('Failed to fetch doctors.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleStatusChange = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/doctors/${id}`, { status: 'suspended' });
      setDoctors((prevState) =>
        prevState.map((doctor) =>
          doctor._id === id ? { ...doctor, status: 'suspended' } : doctor
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="my-4">
      <div className="mb-4">
        <h2>All Doctors</h2>
        <p>Manage your clinic's doctors.</p>
      </div>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialty</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
              <th><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id}>
                <td>{doctor.name}</td>
                <td>{doctor.speciality}</td>
                <td>{doctor.contact}</td>
                <td>{doctor.email}</td>
                <td>
                  <Badge bg={doctor.status === 'active' ? 'success' : 'danger'}>
                    {doctor.status}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleStatusChange(doctor._id)}
                    disabled={doctor.status === 'suspended'}
                  >
                    Suspend
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default AdminDoctorList;
