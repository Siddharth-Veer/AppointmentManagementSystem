import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/index.css';

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
            console.log('Doctor signed in:', response.data);
            alert('Sign in successful!');
            navigate('/doctor-page'); // Redirect to doctor page
        } catch (error) {
            setError('Failed to sign in. Please check your credentials.');
            console.error('Error signing in:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Doctor Sign In</h2>
                {error && <p className="error">{error}</p>}
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
