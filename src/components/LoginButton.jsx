import React, { useState } from 'react';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { useAuth } from '../utils/AuthContext';
import { auth, provider } from '../utils/firebaseConfig';
import { useToast } from '../components/ToastContext'; // Import useToast

const GoogleSignIn = () => {
    const API_BASE_URL = 'http://localhost:3000';
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const addToast = useToast(); // Get addToast function

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const idToken = await user.getIdToken();

            const response = await axios.post(`${API_BASE_URL}/auth/google`, { idToken });

            if (response.data.auth) {
                if (response.data.user && response.data.user.role) {
                    login(response.data.token, response.data.user.role); // Menyertakan role
                    addToast('Login successful!', 'primary'); // Show success toast
                } else {
                    addToast('User data or role is missing', 'danger');
                    console.error("User data or role is missing:", response.data);
                }
            } else {
                addToast('Login failed! Please check your username and password and try again.', 'danger');
                console.error("Authentication failed:", response.data.message);
            }
        } catch (error) {
            addToast('Login failed! Please check your username and password and try again.', 'danger');
            console.error("Error during Google Sign-In:", error);
        }
    };

    const signInWithUsername = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });

            if (response.data.auth) {
                if (response.data.user && response.data.user.role) {
                    login(response.data.token, response.data.user.role); // Menyertakan role
                    addToast('Login successful!', 'primary'); // Show success toast
                } else {
                    addToast('User data or role is missing', 'danger');
                    console.error("User data or role is missing:", response.data);
                }
            } else {
                addToast('Login failed! Please check your username and password and try again.', 'danger');
                console.error("Authentication failed:", response.data.message);
            }
        } catch (error) {
            addToast('Login failed! Please check your username and password and try again.', 'danger');
            console.error("Error during username sign-in:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Sign In</h2>

            <div className="mb-4">
                <button className="btn btn-danger" onClick={signInWithGoogle}>
                    Sign In with Google
                </button>
            </div>

            <div>
                <h4 className="mb-3">Sign In with Username</h4>
                <form onSubmit={signInWithUsername}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Sign In with Username
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GoogleSignIn;