import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included
import { Container, Row, Col, Form, Button, Alert, Modal } from 'react-bootstrap';

const DoctorSignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/doctors/signin', { email, password });
            console.log('Response:', response.data);

            if (response.data.message === 'Sign in successful') {
                sessionStorage.setItem('doctorToken', response.data.token); // Store JWT token in session storage
                sessionStorage.setItem('doctorName', response.data.name);  // Store doctor's name in session storage
                alert('Sign in successful!');
                navigate('/doctor-dashboard');
            } else {
                setError('Failed to sign in. Please check your credentials.');
            }
        } catch (error) {
            setError('Failed to sign in. Please check your credentials.');
            console.error('Error signing in:', error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
            <Row className="justify-content-start">
                        <Col xs="auto">
                            <Button variant="link" onClick={() => navigate('/')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 1-.5.5H3.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708.708L3.707 7.5H14.5A.5.5 0 0 1 15 8z" />
                                </svg>
                            </Button>
                        </Col>
                    </Row>
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Sign In</h2>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DoctorSignIn;
