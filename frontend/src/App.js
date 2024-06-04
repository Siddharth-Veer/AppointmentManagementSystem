import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AppointmentBooking from './pages/AppointmentBooking';
import { AppointmentProvider } from './context/AppointmentContext';

const App = () => {
  return (
    <AppointmentProvider>
      <Router>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/book-appointment" component={AppointmentBooking} />
        </Switch>
      </Router>
    </AppointmentProvider>
  );
};

export default App;
