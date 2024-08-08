// AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SignIn.css'; // Use the same CSS file as SignIn

const AdminLogin = () => {
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
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
              });

            const result = await response.json();
            if (response.ok) {
                localStorage.setItem('adminToken', result.token);
                navigate('/admin');
            } else {
                setError(result.message || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred');
        }
    };


    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Admin Login</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
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
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
