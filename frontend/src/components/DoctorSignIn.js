// src/components/DoctorSignIn.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../css/SignIn.css';

const DoctorSignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/doctors/login', {
                email,
                password
            });

            // Handle successful response
            setMessage(response.data.message);
            setError('');
            
            // Optionally save a token or session info if needed
            // localStorage.setItem('token', response.data.token); // Uncomment if you use tokens
            navigate('/doctor-page'); // Redirect to the doctor page
        } catch (error) {
            setError(error.response?.data?.message || 'Error occurred: ' + error.message);
            setMessage('');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Sign In</h2>
                {error && <p className="error">{error}</p>}
                {message && <p className="success">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default DoctorSignIn;
