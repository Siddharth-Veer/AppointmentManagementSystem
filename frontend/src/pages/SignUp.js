import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword, updateProfile, googleProvider, signInWithPopup } from '../firebase';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../css/SignUp.css';

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

        try {
            // Firebase sign-up
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user) {
                await updateProfile(user, { displayName: name });

                // Generate a unique ID and save user details in MongoDB
                const idNo = await generateUniqueId();
                await axios.post("http://localhost:5000/api/auth/register", {
                    idNo,
                    name,
                    email,
                    dateOfBirth,
                });

                setSuccessMessage("User signed up successfully!");
                navigate("/sign-in", { state: { name } });
            }
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setError("This email is already in use.");
            } else {
                setError("Error during sign-up: " + error.message);
            }
        }
    };

    const generateUniqueId = async () => {
        try {
            // Fetch the latest ID from the database
            const response = await axios.get("http://localhost:5000/api/auth/latest-id");
            const latestId = response.data.latestId;

            if (latestId) {
                // Increment the latest ID
                const newId = (parseInt(latestId) + 1).toString().padStart(4, '0');
                return newId;
            } else {
                // If no IDs exist, start with "0001"
                return "0001";
            }
        } catch (error) {
            console.error("Error generating unique ID:", error);
            throw new Error("Unable to generate unique ID");
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            if (user) {
                const userName = user.displayName || 'User';
                localStorage.setItem('userName', userName); // Save user name to local storage
                console.log('User signed in with Google:', user);
                setSuccessMessage('User signed in with Google successfully!');
                navigate('/appointment-booking'); // Redirect to book-appointment page after Google sign
            } else {
                setError('Failed to sign in with Google');
            }
        } catch (error) {
            setError(error.message);
        }
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
                <button onClick={handleGoogleSignIn} className="google-signin-button">
                    Sign Up with Google
                </button>
            </div>
        </div>
    );
};

export default SignUp;
