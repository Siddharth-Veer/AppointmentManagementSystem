import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://medisync-w9rq.onrender.com/api/doctors');
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
      await axios.put(`https://medisync-w9rq.onrender.com/api/doctors/${id}`, doctorToSave);
      console.log('Doctor saved:', doctorToSave);
      alert('Doctor details updated successfully!');
    } catch (error) {
      console.error('Error saving doctor:', error);
      alert('Failed to update doctor details.');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://medisync-w9rq.onrender.com/api/doctors/${doctorToDelete}`);
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
    <div className="container mt-4">
      <h2>Manage Doctors</h2>
      <table className="table table-striped">
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
                  className="form-control"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="speciality"
                  value={doctor.speciality}
                  onChange={(event) => handleInputChange(doctor._id, event)}
                  className="form-control"
                />
              </td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={doctor.email}
                  onChange={(event) => handleInputChange(doctor._id, event)}
                  className="form-control"
                />
              </td>
              <td>
                <input
                  type="password"
                  name="password"
                  value={doctor.password}
                  onChange={(event) => handleInputChange(doctor._id, event)}
                  className="form-control"
                />
              </td>
              <td>
                <button 
                  className="btn btn-primary me-2" 
                  onClick={() => handleSave(doctor._id)}
                >
                  Save
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => { setShowConfirm(true); setDoctorToDelete(doctor._id); }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowConfirm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this doctor?</p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowConfirm(false)}
                >
                  No
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleDelete}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDoctors;
