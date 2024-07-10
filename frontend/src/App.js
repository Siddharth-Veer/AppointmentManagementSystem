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
import AddDoctor from './pages/AddDoctor'; // Import AddDoctor
import SelectDateTime from './pages/select-date-time';
import AppointmentConfirmation from './pages/AppointmentConfirmation';

import { AppointmentProvider } from './context/AppointmentContext';

const App = () => {
  return (
    <Router>
      <AppointmentProvider>
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/registration-form" element={<RegistrationForm />} />
          <Route path="/book-appointment" element={<AppointmentBooking />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/add-doctor" element={<AddDoctor />} /> {/* Add the new route */}
          <Route path="/select-date-time" element={<SelectDateTime />} />
          <Route path="/appointment-confirmation" element={<AppointmentConfirmation />} />
        </Routes>
      </AppointmentProvider>
    </Router>
  );
} 

export default App;
