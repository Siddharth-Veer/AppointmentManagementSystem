// AdminLogout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                await fetch('/api/auth/logout', { method: 'POST' });
                localStorage.removeItem('adminToken'); // Clear the token from localStorage
                navigate('/admin-login'); // Redirect to login page
            } catch (error) {
                console.error('Logout failed:', error);
            }
        };

        logout();
    }, [navigate]);

    return <div>Logging out...</div>;
};

export default AdminLogout;
