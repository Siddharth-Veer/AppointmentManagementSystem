import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword, updateProfile ,googleProvider, signInWithPopup} from '../firebase'; // Adjust the path as per your project structure
import { useNavigate } from 'react-router-dom';
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

            if (user) {
                await updateProfile(user, { displayName: name });
                console.log('User signed up:', user);
                setSuccessMessage('User signed up successfully!');
                navigate('/registration-form'); // Redirect to book-appointment page after sign-up
            } else {
                setError('Failed to create user');
            }
        } catch (error) {
            setError(error.message);
        }
    };
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            if (user) {
                console.log('User signed in with Google:', user);
                setSuccessMessage('User signed in with Google successfully!');
                navigate('/registration-form'); // Redirect to book-appointment page after Google sign-in
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
