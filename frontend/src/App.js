import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { AppointmentProvider } from './context/AppointmentContext';

const App = () => {
  return (
    <AppointmentProvider>
      <Router>
      <Routes>
          <Route path="/" component={HomePage} exact />
          </Routes>
      </Router>
    </AppointmentProvider>
  );
};
//raj

export default App;
