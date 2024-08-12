import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword, updateProfile, googleProvider, signInWithPopup } from '../firebase';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Alert, Modal } from 'react-bootstrap';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const generateUniqueId = async () => {
        try {
            const response = await axios.get("https://medisync-w9rq.onrender.com/api/auth/generate-id");
            return response.data.idNo;
        } catch (error) {
            console.error("Error generating unique ID:", error);
            throw new Error("Failed to generate unique ID");
        }
    };

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
                await axios.post("https://medisync-w9rq.onrender.com/api/auth/register", {
                    idNo,
                    name,
                    email,
                    dateOfBirth,
                    password, // Include password for the backend
                });

                setSuccessMessage("User signed up successfully!");
                navigate("/sign-in", { state: { name } });
            }
        } catch (error) {
            console.error("Error during sign-up:", error);
            if (error.code === "auth/email-already-in-use") {
                setError("This email is already in use.");
            } else {
                setError("Error during sign-up: " + error.message);
            }
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            if (user) {
                const userName = user.displayName || 'User';
                sessionStorage.setItem('userName', userName); // Save user name to local storage
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
        <Modal show={true} centered>
            <Modal.Body className="p-4">
                <Container>
                    <Row className="justify-content-start">
                        <Col xs="auto">
                            <Button variant="link" onClick={() => navigate('/')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 1-.5.5H3.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708.708L3.707 7.5H14.5A.5.5 0 0 1 15 8z" />
                                </svg>
                            </Button>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col xs={12} md={8} lg={6}>
                            <h2 className="text-center mb-4">Sign Up</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {successMessage && <Alert variant="success">{successMessage}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formDateOfBirth">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Sign Up
                                </Button>
                            </Form>
                            <Button onClick={handleGoogleSignIn} variant="info" className="w-100 mt-3">
                                Sign Up with Google
                            </Button>

                            {/* Add a link which says if already a user go to Signin */}
                            <p className="text-center mt-3">
                                Already have an account? <Link to="./sign-in">Sign In</Link>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default SignUp;
