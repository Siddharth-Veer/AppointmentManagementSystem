import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppointmentProvider } from './context/AppointmentContext';
import { Link } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <AppointmentProvider> {/* Wrap App with AppointmentProvider */ }
      <App />
    </AppointmentProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
