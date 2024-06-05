import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AppointmentBooking from './pages/AppointmentBooking';
import SignIn from './pages/SignIn';
import { AppointmentProvider } from './context/AppointmentContext';

const App = () => {
  return (
    <Router>
      <AppointmentProvider>
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/book-appointment" element={<AppointmentBooking />} />
          <Route path="/SignIn" element={<SignIn />} />
        </Routes>
      </AppointmentProvider>
    </Router>
  );
}

export default App;
