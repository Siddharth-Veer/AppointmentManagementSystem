// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AppointmentBooking from './pages/AppointmentBooking';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import AddDoctor from './components/AddDoctor';
import SelectDateTime from './pages/select-date-time';
import AppointmentConfirmation from './pages/AppointmentConfirmation';
import AdminLogin from './pages/AdminLogin';
import AdminMainLayout from './components/AdminMainLayout';
import AdminLogin from './components/AdminLogin'; 
import DoctorSignIn from './components/DoctorSignIn';
import DoctorDashboard from './components/DoctorDashboard';
import AdminLogout from './components/AdminLogout'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import WalkIn from './pages/WalkIn';
import { AppointmentProvider } from './context/AppointmentContext';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/appointment-booking" element={<AppointmentBooking />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/select-date-time" element={<SelectDateTime />} />
        <Route path="/appointment-confirmation" element={<AppointmentConfirmation />} />
        <Route path="/doctor-signin" element={<DoctorSignIn />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/walk-in" element={<WalkIn />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-logout" element={<AdminLogout />} /> {/* Add AdminLogout route */}
        <Route path="/admin/*" element={<AdminMainLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
