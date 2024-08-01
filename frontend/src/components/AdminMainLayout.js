// src/components/AdminMainLayout.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminDoctorList from './AdminDoctorList';
import AddDoctor from './AddDoctor';
import ManageDoctors from './ManageDoctors';
import ManageAvailability from './ManageAvailability'; 
import ManageAppointments from './ManageAppointment'; // Import new component
import '../css/AdminMainLayout.css';

const AdminMainLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-muted-40">
      <AdminSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <AdminHeader />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Routes>
            <Route path="/" element={<AdminDoctorList />} />
            <Route path="doctorslist" element={<AdminDoctorList />} />
            <Route path="add-doctor" element={<AddDoctor />} />
            <Route path="manage-doctors" element={<ManageDoctors />} />
            <Route path="manage-availability" element={<ManageAvailability />} />
            <Route path="manage-appointment" element={<ManageAppointments />} /> {/* Add route */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminMainLayout;
