import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Appointment.js';

import HomePage from './pages/HomePage';
import AppointmentBooking from './pages/AppointmentBooking';
import { AppointmentProvider } from './context/AppointmentContext';

const App = () => {
  return (
    <Router>
      <AppointmentProvider>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/book-appointment" component={AppointmentBooking} />
        </Switch>
      </AppointmentProvider>
    </Router>
  );
}

export default App;
