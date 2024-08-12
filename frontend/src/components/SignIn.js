import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useNavigate , Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Alert, Modal } from 'react-bootstrap';

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
                const userName = user.displayName || 'User';
                sessionStorage.setItem('userName', userName); // Save user name to session storage
                console.log('User signed in:', user);
                navigate('/appointment-booking'); // Redirect to book-appointment page after sign-in
            } else {
                setError('Failed to sign in');
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
                const userName = user.displayName || 'User';
                sessionStorage.setItem('userName', userName); // Save user name to session storage
                console.log('User signed in with Google:', user);
                navigate('/appointment-booking'); // Redirect to book-appointment page after Google sign-in
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
                    {/* add a back icon to go back to Home page */}
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
                            <h2 className="text-center mb-4">Sign In</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100 mb-2">
                                    Sign In
                                </Button>
                            </Form>
                            <Button variant="outline-primary" onClick={handleGoogleSignIn} className="w-100 mb-2">
                                Sign In with Google
                            </Button>
                            <div className="text-center">
                                <p>
                                    <Link to="/forgot-password" className="link-primary">Forgot Password?</Link>
                                </p>
                                <p>
                                    <Link to="/signup" className="link-primary">New User - Sign Up First</Link>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default SignIn;
