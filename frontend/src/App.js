import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Appointment.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Appointment/>} />
      </Routes>
    </Router>
  );
}

export default App;
