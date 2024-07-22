import React from 'react';
import Sidebar from '../pages/AdminSidebar';
import Header from '../pages/AdminHeader';
import DoctorList from '../pages/AdminDoctorList';
import '../css/AdminMainLayout.css';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-muted-40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <DoctorList />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
