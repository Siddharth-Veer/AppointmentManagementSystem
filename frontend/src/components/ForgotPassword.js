import React, { useState } from 'react';
import { auth, sendPasswordResetEmail } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      setSuccess('');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('Password reset instructions have been sent to your email');
      setError('');
    } catch (error) {
      setError(error.message);
      setSuccess('');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Forgot Password</h2>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          {success && <div className="alert alert-success" role="alert">{success}</div>}
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
            <button type="submit" className="btn btn-primary w-100">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
