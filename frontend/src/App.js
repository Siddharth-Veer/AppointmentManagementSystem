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
import AddDoctor from './pages/AddDoctor';
import SelectDateTime from './pages/select-date-time';
import AppointmentConfirmation from './pages/AppointmentConfirmation';
// import DoctorPage from './pages/DoctorPage';
import DoctorSignIn from './pages/DoctorSignIn';
import { AppointmentProvider } from './context/AppointmentContext';

const App = () => {
  return (
    <Router>
      <AppointmentProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration-form" element={<RegistrationForm />} />
          <Route path="/book-appointment" element={<AppointmentBooking />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/select-date-time" element={<SelectDateTime />} />
          <Route path="/appointment-confirmation" element={<AppointmentConfirmation />} />
          <Route path="/doctor-signin" element={<DoctorSignIn />} />
          {/* <Route path="/doctor-page" element={<DoctorPage />} /> */}
        </Routes>
      </AppointmentProvider>
    </Router>
  );
};

export default App;

