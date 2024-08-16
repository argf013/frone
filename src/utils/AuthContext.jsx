// utils/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [userRole, setUserRole] = useState(null); // Menambahkan state untuk role
    const navigate = useNavigate();

    const login = (token, role) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
        setUserRole(role); // Menyimpan role
        navigate('/dashboard');
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserRole(null); // Menghapus role saat logout
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    return useContext(AuthContext);
};
