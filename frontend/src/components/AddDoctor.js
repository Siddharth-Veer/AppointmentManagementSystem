import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const AddDoctor = () => {
    const [formData, setFormData] = useState({
        name: '',
        speciality: '',
        contact: '',
        email: '',
        password: '',
        status: 'Active',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // List of specialities
    const specialities = [
        'Cardiology',
        'Dermatology',
        'Pediatrics',
        'Neurology',
        'Orthopedics',
        'Gastroenterology',
        'Oncology'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting form data:', formData); // Log form data for debugging
            const response = await axios.post('http://localhost:5000/api/doctors', formData);
            console.log('Doctor added:', response.data);
            setSuccess('Doctor has been added successfully!');
            setError('');
            setTimeout(() => navigate('/admin/manage-doctors'), 2000); // Redirect after 2 seconds
        } catch (error) {
            console.error('Error adding doctor:', error.response ? error.response.data : error.message);
            setError('Failed to add doctor. Please try again.');
            setSuccess('');
        }
    };

    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <div className="p-4 border rounded shadow-sm bg-white">
                        <h2 className="text-center mb-4">Add Doctor</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">{success}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter doctor's name"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formSpeciality">
                                <Form.Label>Speciality</Form.Label>
                                <Form.Select
                                    name="speciality"
                                    value={formData.speciality}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Speciality</option>
                                    {specialities.map((speciality, index) => (
                                        <option key={index} value={speciality}>
                                            {speciality}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formContact">
                                <Form.Label>Contact</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter contact number"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter email address"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter password"
                                />
                            </Form.Group>
                            <Button variant="success" type="submit" className="w-100">
                                Add Doctor
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AddDoctor;
