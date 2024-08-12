import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AppointmentBooking from './pages/AppointmentBooking';
import AppointmentList from './pages/AppointmentList';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import AddDoctor from './components/AddDoctor';
import AppointmentConfirmation from './pages/AppointmentConfirmation';
import AdminMainLayout from './components/AdminMainLayout';
import AdminLogin from './components/AdminLogin'; 
import DoctorSignIn from './components/DoctorSignIn';
import DoctorDashboard from './components/DoctorDashboard';
import AdminLogout from './components/AdminLogout'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import WalkIn from './pages/WalkIn';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/appointment-booking" element={<AppointmentBooking />} />
        <Route path="/appointments" element={<AppointmentList />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/appointment-confirmation" element={<AppointmentConfirmation />} />
        <Route path="/doctor-signin" element={<DoctorSignIn />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/walk-in" element={<WalkIn />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-logout" element={<AdminLogout />} /> {/* Add AdminLogout route */}
        <Route path="/admin/*" element={<AdminMainLayout />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
