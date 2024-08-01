import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import { HomeIcon, UserIcon, PlusIcon, CogIcon, CalendarIcon, ClipboardDocumentIcon, PowerIcon } from '@heroicons/react/24/outline'; // Import icons from Heroicons
import '../css/AdminSidebar.css';

const AdminSidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link to="/admin" className="sidebar-item group">
          <HomeIcon className="icon" />
          <span className="sr-only">Home</span>
        </Link>
        <Link to="/admin/doctorslist" className="sidebar-item group">
          <UserIcon className="icon" />
          <span className="sr-only">Doctors List</span>
        </Link>
        <Link to="/admin/add-doctor" className="sidebar-item group">
          <PlusIcon className="icon" />
          <span className="sr-only">Add Doctor</span>
        </Link>
        <Link to="/admin/manage-doctors" className="sidebar-item group">
          <CogIcon className="icon" />
          <span className="sr-only">Manage Doctors</span>
        </Link>
        <Link to="/admin/manage-availability" className="sidebar-item group">
          <CalendarIcon className="icon" />
          <span className="sr-only">Manage Availability</span>
        </Link>
        <Link to="/admin/manage-appointment" className="sidebar-item group">
          <ClipboardDocumentIcon className="icon" />
          <span className="sr-only">Manage Appointments</span>
        </Link>
        <Link to="/admin-login" className="sidebar-item group">
          <PowerIcon className="icon" />
          <span className="sr-only">Logout</span>
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
