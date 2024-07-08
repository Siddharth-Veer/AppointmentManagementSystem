import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust the path as per your project structure
import { useNavigate } from 'react-router-dom';
import '../css/SignIn.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user) {
                console.log('User signed in:', user);
                navigate('/book-appointment'); // Redirect to book-appointment page after sign-in
            } else {
                setError('Failed to sign in');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Sign In</h2>
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
                    <p>
                        <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
