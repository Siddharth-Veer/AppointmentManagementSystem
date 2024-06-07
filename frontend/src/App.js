import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { AppointmentProvider } from './context/AppointmentContext';

const App = () => {
  return (
    <AppointmentProvider>
      <Router>
        <Switch>
          <Route path="/" component={HomePage} exact />
        </Switch>
      </Router>
    </AppointmentProvider>
  );
};
//raj

export default App;
