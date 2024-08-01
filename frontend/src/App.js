// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AppointmentBooking from './pages/AppointmentBooking';
import SignInPage from './pages/SignInUp'; // Updated import path
import SignUpPage from './pages/SignUpPage';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import RegistrationForm from './pages/RegistrationForm';
import SelectDateTime from './pages/select-date-time';
import AppointmentConfirmation from './pages/AppointmentConfirmation';
import AdminLogin from './pages/AdminLogin';
import AdminMainLayout from './components/AdminMainLayout';
import DoctorPage from './pages/DoctorPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import WalkIn from './pages/WalkIn';
import { AppointmentProvider } from './context/AppointmentContext';

const App = () => {
  return (
    <Router>
      <AppointmentProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/appointment-booking" element={<AppointmentBooking />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/registration-form" element={<RegistrationForm />} />
          <Route path="/select-date-time" element={<SelectDateTime />} />
          <Route path="/appointment-confirmation" element={<AppointmentConfirmation />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/doctorpage" element={<DoctorPage />} />
          <Route path="/walk-in" element={<WalkIn />} />
          <Route path="/admin/*" element={<AdminMainLayout />} /> {/* Admin routes */}
        </Routes>
      </AppointmentProvider>
    </Router>
  );
};

export default App;
