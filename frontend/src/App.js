import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AppointmentBooking from './pages/AppointmentBooking';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import { AppointmentProvider } from './context/AppointmentContext';

const App = () => {
  return (
    <Router>
      <AppointmentProvider>
        <Routes>
          <Route path="/" component={HomePage} exact />
          <Route path="/book-appointment" element={<AppointmentBooking />} />
          <Route path="/SignIn" element={<SignIn />}  />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AppointmentProvider>
    </Router>
  );
};

export default App;
