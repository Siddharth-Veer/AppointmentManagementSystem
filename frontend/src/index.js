import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppointmentProvider } from './context/AppointmentContext'; // Import the AppointmentProvider

ReactDOM.render(
  <React.StrictMode>
    <AppointmentProvider> {/* Wrap App with AppointmentProvider */}
      <App />
    </AppointmentProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
