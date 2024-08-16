import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const API_BASE_URL = 'http://localhost:3000';
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    const handleRegister = async () => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/auth/register`,
                { username, email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.data.auth) {
                // Simpan token di localStorage
                localStorage.setItem('token', response.data.token);

                // Arahkan ke dashboard
                navigate('/dashboard');
            } else {
                setError(response.data.message);
                setSuccess(null);
            }
        } catch (error) {
            console.error("Error during registration:", error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data.message : "An error occurred. Please try again.");
            setSuccess(null);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Register</h2>
            {success && <p className="text-success">{success}</p>}
            {error && <p className="text-danger">{error}</p>}
            <div className="mt-3">
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
                    type="button"
                    className="btn btn-primary"
                    onClick={handleRegister}
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default Register;
