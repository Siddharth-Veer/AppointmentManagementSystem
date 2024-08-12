import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, UserIcon, PlusIcon, CogIcon, CalendarIcon, ClipboardDocumentIcon, PowerIcon } from '@heroicons/react/24/outline';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminSidebar = () => {
  return (
    <aside className="position-fixed top-0 start-0 zindex-10 d-none d-sm-flex flex-column bg-light border-end h-100 p-3">
      <nav className="d-flex flex-column align-items-center gap-3">
        <Link to="/admin" className="btn btn-light d-flex align-items-center justify-content-center rounded-circle p-2 hover-bg-primary">
          <HomeIcon className="icon" style={{ width: '24px', height: '24px', color: '#000' }} />
          <span className="visually-hidden">Home</span>
        </Link>
        <Link to="/admin/doctorslist" className="btn btn-light d-flex align-items-center justify-content-center rounded-circle p-2 hover-bg-primary">
          <UserIcon className="icon" style={{ width: '24px', height: '24px', color: '#000' }} />
          <span className="visually-hidden">Doctors List</span>
        </Link>
        <Link to="/admin/add-doctor" className="btn btn-light d-flex align-items-center justify-content-center rounded-circle p-2 hover-bg-primary">
          <PlusIcon className="icon" style={{ width: '24px', height: '24px', color: '#000' }} />
          <span className="visually-hidden">Add Doctor</span>
        </Link>
        <Link to="/admin/manage-doctors" className="btn btn-light d-flex align-items-center justify-content-center rounded-circle p-2 hover-bg-primary">
          <CogIcon className="icon" style={{ width: '24px', height: '24px', color: '#000' }} />
          <span className="visually-hidden">Manage Doctors</span>
        </Link>
        <Link to="/admin/manage-availability" className="btn btn-light d-flex align-items-center justify-content-center rounded-circle p-2 hover-bg-primary">
          <CalendarIcon className="icon" style={{ width: '24px', height: '24px', color: '#000' }} />
          <span className="visually-hidden">Manage Availability</span>
        </Link>
        <Link to="/admin/manage-appointment" className="btn btn-light d-flex align-items-center justify-content-center rounded-circle p-2 hover-bg-primary">
          <ClipboardDocumentIcon className="icon" style={{ width: '24px', height: '24px', color: '#000' }} />
          <span className="visually-hidden">Manage Appointments</span>
        </Link>
        <Link to="/admin-login" className="btn btn-light d-flex align-items-center justify-content-center rounded-circle p-2 hover-bg-primary">
          <PowerIcon className="icon" style={{ width: '24px', height: '24px', color: '#000' }} />
          <span className="visually-hidden">Logout</span>
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
