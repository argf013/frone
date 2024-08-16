import React, { useState } from 'react';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { useAuth } from '../utils/AuthContext';
import { auth, provider } from '../utils/firebaseConfig';

const GoogleSignIn = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const idToken = await user.getIdToken();

            const response = await axios.post('http://localhost:3000/auth/google', { idToken });

            if (response.data.auth) {
                if (response.data.user && response.data.user.role) {
                    login(response.data.token, response.data.user.role); // Menyertakan role
                } else {
                    console.error("User data or role is missing:", response.data);
                }
            } else {
                console.error("Authentication failed:", response.data.message);
            }
        } catch (error) {
            console.error("Error during Google Sign-In:", error);
        }
    };

    const signInWithUsername = async () => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', { username, password });

            if (response.data.auth) {
                if (response.data.user && response.data.user.role) {
                    login(response.data.token, response.data.user.role); // Menyertakan role
                } else {
                    console.error("User data or role is missing:", response.data);
                }
            } else {
                console.error("Authentication failed:", response.data.message);
            }
        } catch (error) {
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
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" onClick={signInWithUsername}>
                    Sign In with Username
                </button>
            </div>
        </div>
    );
};

export default GoogleSignIn;
