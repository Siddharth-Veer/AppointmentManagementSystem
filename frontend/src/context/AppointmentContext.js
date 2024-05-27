import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import AppointmentReducer from './AppointmentReducer';

const initialState = {
  appointments: [],
};

export const AppointmentContext = createContext(initialState);

export const AppointmentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppointmentReducer, initialState);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('/api/appointments');
      dispatch({
        type: 'GET_APPOINTMENTS',
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppointmentContext.Provider value={{
      appointments: state.appointments,
      fetchAppointments,
    }}>
      {children}
    </AppointmentContext.Provider>
  );
};
