import React, { useState } from "react";
import { auth, createUserWithEmailAndPassword, updateProfile, signInWithPopup, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/index.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !email || !password || !dateOfBirth) {
      setError("Please fill in all fields");
      return;
    }
  
    console.log("Submitting data:", { idNo: generateUniqueId(), name, email, dateOfBirth, password });
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      if (user) {
        await updateProfile(user, { displayName: name });
  
        const response = await axios.post("http://localhost:5000/api/auth/register", {
          idNo: generateUniqueId(),
          name,
          email,
          dateOfBirth,
          password
        });
  
        console.log("Server response:", response.data);
  
        setSuccessMessage("User signed up successfully!");
        navigate("/sign-in", { state: { name } });
      }
    } catch (error) {
      // console.error("Sign up error:", error.response ? error.response.data : error.message);
      setError("Error during sign-up: " + (error.response ? error.response.data.message : error.message));
    }
  };
  

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save user details in MongoDB
      const idNo = generateUniqueId();
      await axios.post("http://localhost:5000/api/auth/register", {
        idNo,
        name: user.displayName || "",
        email: user.email,
        dateOfBirth: "",
        password: ""  // Google sign-up does not have a password
      });

      setSuccessMessage("User signed up with Google successfully!");
      navigate("/sign-in", { state: { name: user.displayName || "" } });
    } catch (error) {
      setError("Error during Google sign-up: " + error.message);
    }
  };

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            <input
              type="date"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <button onClick={handleGoogleSignUp} className="google-signup-button">
          Sign Up with Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
