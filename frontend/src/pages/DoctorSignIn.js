import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/SignIn.css';

const DoctorSignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/doctors/signin', { email, password });
            console.log('Doctor signed in:', response.data);
            alert('Sign in successful!');
            navigate('/'); // Redirect to a secure page or dashboard
        } catch (error) {
            console.error('Error signing in:', error);
            alert('Failed to sign in. Please check your credentials.');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
            <form onSubmit={handleSubmit} className="doctor-signin-form">
                <h2>Doctor Sign In</h2>
                <div className="form-section">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-section">
                    <label>Password:</label>
                    <input
                        type="password"
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
