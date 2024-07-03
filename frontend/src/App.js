import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AppointmentBooking from './pages/AppointmentBooking';
import AboutUs from './pages/AboutUs';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { AppointmentProvider } from './context/AppointmentContext';

const App = () => {
  return (
    <Router>
      <AppointmentProvider>
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/book-appointment" element={<AppointmentBooking />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AppointmentProvider>
    </Router>
  );
}

export default App;
