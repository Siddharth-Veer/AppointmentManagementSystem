import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/RegistrationForm.css';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        idNo: '',
        name: '',
        email: '',
        dateOfBirth: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', formData);
            localStorage.setItem('patientName', formData.name); // Set patientName in localStorage
            navigate('/appointment-booking');
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className="registration-container">
            <form onSubmit={handleSubmit} className="registration-form">
                <h2>Registration Form</h2>
                <div className="form-section">
                    <label>ID No.:</label>
                    <input type="text" name="idNo" value={formData.idNo} onChange={handleChange} required />
                </div>
                <div className="form-section">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-section">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-section">
                    <label>Date of Birth:</label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegistrationForm;