import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import { AppointmentProvider } from './context/AppointmentContext';

const App = () => {
  return (
    <Router>
      <AppointmentProvider>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </AppointmentProvider>
    </Router>
  );
};

export default App;
