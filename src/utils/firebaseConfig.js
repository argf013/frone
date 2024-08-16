// /utils/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage

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
const storage = getStorage(app); // Initialize Firebase Storage

export { auth, provider, storage };
