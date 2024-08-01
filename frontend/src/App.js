import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AppointmentBooking from './pages/AppointmentBooking';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import RegistrationForm from './pages/RegistrationForm';
import AddDoctor from './components/AddDoctor';
import SelectDateTime from './pages/select-date-time';
import AppointmentConfirmation from './pages/AppointmentConfirmation';
import AdminMainLayout from './components/AdminMainLayout';

import { AppointmentProvider } from './context/AppointmentContext';
// import DoctorPage from './pages/DoctorPage';
import DoctorSignIn from './pages/DoctorSignIn';
const App = () => {
  return (
    <Router>
      <AppointmentProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/appointment-booking" element={<AppointmentBooking />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/registration-form" element={<RegistrationForm />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/select-date-time" element={<SelectDateTime />} />
          <Route path="/appointment-confirmation" element={<AppointmentConfirmation />} />
          <Route path="/doctor-signin" element={<DoctorSignIn />} />
          {/* <Route path="/doctor-page" element={<DoctorPage />} /> */}
          {/* Admin routes */}
          <Route path="/admin/*" element={<AdminMainLayout />} />
        </Routes>
      </AppointmentProvider>
    </Router>
  );
};

export default App;

