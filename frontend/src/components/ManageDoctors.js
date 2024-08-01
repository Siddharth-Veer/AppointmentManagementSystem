import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false); // State to manage confirmation dialog
  const [doctorToDelete, setDoctorToDelete] = useState(null); // State to track which doctor to delete

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleInputChange = (id, event) => {
    const { name, value } = event.target;
    setDoctors((prevState) =>
      prevState.map((doctor) => (doctor._id === id ? { ...doctor, [name]: value } : doctor))
    );
  };

  const handleSave = async (id) => {
    const doctorToSave = doctors.find((doc) => doc._id === id);
    try {
      await axios.put(`http://localhost:5000/api/doctors/${id}`, doctorToSave);
      console.log('Doctor saved:', doctorToSave);
      alert('Doctor details updated successfully!');
    } catch (error) {
      console.error('Error saving doctor:', error);
      alert('Failed to update doctor details.');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/doctors/${doctorToDelete}`);
      setDoctors(doctors.filter((doctor) => doctor._id !== doctorToDelete));
      setShowConfirm(false);
      setDoctorToDelete(null);
      alert('Doctor deleted successfully!');
    } catch (error) {
      console.error('Error deleting doctor:', error);
      alert('Failed to delete doctor.');
    }
  };

  return (
    <div className="manage-doctors-container">
      <h2>Manage Doctors</h2>
      <table className="manage-doctors-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Speciality</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor._id}>
              <td>
                <input
                  type="text"
                  name="name"
                  value={doctor.name}
                  onChange={(event) => handleInputChange(doctor._id, event)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="speciality"
                  value={doctor.speciality}
                  onChange={(event) => handleInputChange(doctor._id, event)}
                />
              </td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={doctor.email}
                  onChange={(event) => handleInputChange(doctor._id, event)}
                />
              </td>
              <td>
                <input
                  type="password"
                  name="password"
                  value={doctor.password}
                  onChange={(event) => handleInputChange(doctor._id, event)}
                />
              </td>
              <td>
                <button onClick={() => handleSave(doctor._id)}>Save</button>
                <button onClick={() => { setShowConfirm(true); setDoctorToDelete(doctor._id); }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="confirm-dialog">
          <p>Are you sure you want to delete this doctor?</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => setShowConfirm(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default ManageDoctors;
