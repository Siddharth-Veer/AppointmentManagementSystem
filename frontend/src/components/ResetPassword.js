import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth, confirmPasswordReset } from "../firebase";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter a new password");
      setSuccess("");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setSuccess("Password has been reset successfully!");
      setError("");
      navigate("/sign-in");
    } catch (error) {
      setError(error.message);
      setSuccess("");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px' }}>
        <h2 className="mb-4">Reset Password</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">New Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
