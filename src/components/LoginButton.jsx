// Komponen GoogleSignIn.js
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
                login(response.data.token, response.data.user.role); // Menyertakan role
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
                login(response.data.token, response.data.user.role); // Menyertakan role
            } else {
                console.error("Authentication failed:", response.data.message);
            }
        } catch (error) {
            console.error("Error during username sign-in:", error);
        }
    };

    return (
        <div>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={signInWithUsername}>Sign In with Username</button>
            </div>
        </div>
    );
};

export default GoogleSignIn;
