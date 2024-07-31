import React from 'react';
import '../css/AdminDoctorList.css';

const doctors = [
  { name: 'Dr. John Doe', specialty: 'Cardiology', phone: '+1 (555) 123-4567', email: 'john.doe@acmeclinic.com', status: 'Active' },
  { name: 'Dr. Jane Smith', specialty: 'Dermatology', phone: '+1 (555) 987-6543', email: 'jane.smith@acmeclinic.com', status: 'Active' },
  { name: 'Dr. Michael Johnson', specialty: 'Pediatrics', phone: '+1 (555) 456-7890', email: 'michael.johnson@acmeclinic.com', status: 'Suspended' },
  { name: 'Dr. Emily Davis', specialty: 'Obstetrics', phone: '+1 (555) 234-5678', email: 'emily.davis@acmeclinic.com', status: 'Active' }
];

const DoctorList = () => {
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
              {doctors.map((doctor, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4 font-medium">{doctor.name}</td>
                  <td className="p-4">{doctor.specialty}</td>
                  <td className="p-4">{doctor.phone}</td>
                  <td className="p-4">{doctor.email}</td>
                  <td className="p-4">
                    <div className={`badge ${doctor.status === 'Active' ? 'badge-active' : 'badge-suspended'}`}>
                      {doctor.status}
                    </div>
                  </td>
                  <td className="p-4">
                    <button className="menu-button" type="button">
                      <span className="sr-only">Toggle menu</span>
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

export default DoctorList;
