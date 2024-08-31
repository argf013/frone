import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ToastContext'; // Import useToast

const Register = () => {
    const API_BASE_URL = 'http://localhost:3000';
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const addToast = useToast(); // Get addToast function

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const response = await axios.post(
                `${API_BASE_URL}/auth/register`,
                { username, email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.data.auth) {
                // Simpan token di localStorage
                localStorage.setItem('token', response.data.token);
                // Tampilkan toast sukses
                addToast('Registration successful!', 'primary', 3000);
            } else {
                // Tampilkan toast error
                addToast('Gagal Mendaftar! Silahkan coba lagi.', 'danger', 3000);
            }
        } catch (error) {
            console.error("Error during registration:", error.response ? error.response.data : error.message);
            // Tampilkan toast error
            addToast('Gagal Mendaftar! Silahkan coba lagi.', 'danger', 3000);
        }
    };

    return (
        <div className="container my-4 px-5">
            <h2>Register</h2>
            <form onSubmit={handleRegister} className="mt-3">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;