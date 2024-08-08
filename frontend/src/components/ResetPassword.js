import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth, confirmPasswordReset } from "../firebase";
import "../css/index.css";

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
    <div className="modal">
      <div className="modal-content">
        <h2>Reset Password</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
