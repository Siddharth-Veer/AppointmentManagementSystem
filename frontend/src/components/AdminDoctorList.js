import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/AdminDoctorList.css'; // Ensure this CSS file exists and is correctly set up

const AdminDoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setError('Failed to fetch doctors.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleStatusChange = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/doctors/${id}`, { status: 'suspended' });
      setDoctors((prevState) =>
        prevState.map((doctor) =>
          doctor._id === id ? { ...doctor, status: 'suspended' } : doctor
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold">All Doctors</h3>
        <p className="text-sm text-muted-foreground">Manage your clinic's doctors.</p>
      </div>
      <div className="p-6">
        <div className="relative w-full overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">Name</th>
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">Specialty</th>
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">Phone</th>
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">Email</th>
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">Status</th>
                <th className="h-12 px-4 text-left font-medium text-muted-foreground"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor._id} className="border-b">
                  <td className="p-4 font-medium">{doctor.name}</td>
                  <td className="p-4">{doctor.speciality}</td>
                  <td className="p-4">{doctor.contact}</td>
                  <td className="p-4">{doctor.email}</td>
                  <td className="p-4">
                    <div className={`badge ${doctor.status === 'active' ? 'badge-active' : 'badge-suspended'}`}>
                      {doctor.status}
                    </div>
                  </td>
                  <td className="p-4">
                    <button
                      className="status-button"
                      onClick={() => handleStatusChange(doctor._id)}
                      type="button"
                      disabled={doctor.status === 'suspended'}
                    >
                      Suspend
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDoctorList;
