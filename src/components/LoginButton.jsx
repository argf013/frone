import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCexuu2__2ihil9kpqEcwsHGn_J0Tj1sw8",
    authDomain: "balconist-b45ca.firebaseapp.com",
    projectId: "balconist-b45ca",
    storageBucket: "balconist-b45ca.appspot.com",
    messagingSenderId: "873348832164",
    appId: "1:873348832164:web:d34c373cf9be7da812bf31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

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
                login(response.data.token);

                // Optionally fetch user details or redirect to a different page
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
                login(response.data.token);

                // Optionally fetch user details or redirect to a different page
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
