import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/AddDoctor.css';

const AddDoctor = () => {
    const [formData, setFormData] = useState({
        name: '',
        speciality: '',
        contact: ''
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
            const response = await axios.post('http://localhost:5000/api/doctors', formData);
            console.log('Doctor added:', response.data);
            alert('Doctor has been added successfully!');
                
        } catch (error) {
            console.error('Error adding doctor:', error);
        }
    };

    return (
        <div className="add-doctor-container">
            <form onSubmit={handleSubmit} className="add-doctor-form">
                <h2>Add Doctor</h2>
                <div className="form-section">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-section">
                    <label>Speciality:</label>
                    <input type="text" name="speciality" value={formData.speciality} onChange={handleChange} required />
                </div>
                <div className="form-section">
                    <label>Contact:</label>
                    <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
                </div>
                <button type="submit">Add Doctor</button>
            </form>
        </div>
    );
};

export default AddDoctor;
