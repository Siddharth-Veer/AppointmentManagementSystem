import React, { useState } from 'react';
import '../css/ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setError('Please enter your email');
            setSuccess('');
        } else {
            setError('');
            setSuccess('Password reset instructions have been sent to your email');
            console.log('Resetting password for', email);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Forgot Password</h2>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
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
                    <button type="submit">Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
