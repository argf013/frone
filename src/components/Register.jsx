import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    const handleRegister = async () => {
        try {
            const response = await axios.post(
                'http://localhost:3000/auth/register',
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
        <div>
            <h2>Register</h2>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleRegister}>Register</button>
            </div>
        </div>
    );
};

export default Register;
