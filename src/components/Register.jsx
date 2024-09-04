import { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from './ToastContext'; // Import useToast

const Register = () => {
    const API_BASE_URL = 'http://localhost:3000';
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [retypePasswordError, setRetypePasswordError] = useState('');
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [retypePasswordTouched, setRetypePasswordTouched] = useState(false);
    const addToast = useToast(); // Get addToast function

    useEffect(() => {
        const validatePassword = () => {
            if (password.length < 8) {
                setPasswordError('Password must be at least 8 characters long.');
            } else if (!/[A-Z]/.test(password)) {
                setPasswordError('Password must contain at least one uppercase letter.');
            } else if (!/[a-z]/.test(password)) {
                setPasswordError('Password must contain at least one lowercase letter.');
            } else if (!/\d/.test(password)) {
                setPasswordError('Password must contain at least one number.');
            } else if (!/\W/.test(password)) {
                setPasswordError('Password must contain at least one special character.');
            } else {
                setPasswordError('');
            }
        };

        if (passwordTouched) {
            validatePassword();
        }
    }, [password, passwordTouched]);

    useEffect(() => {
        if (retypePasswordTouched && retypePassword && password !== retypePassword) {
            setRetypePasswordError('Passwords do not match!');
        } else {
            setRetypePasswordError('');
        }
    }, [retypePassword, password, retypePasswordTouched]);

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission
        if (passwordError || retypePasswordError) {
            addToast('Please fix the errors before submitting!', 'danger', 3000);
            return;
        }

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
            addToast(`Registration failed! ${error.response.data.message}, Please try again.`, 'danger', 3000);
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
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordTouched(true);
                        }}
                        required
                    />
                    {passwordTouched && passwordError && <div className="text-danger">{passwordError}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="retypePassword" className="form-label">Re-type Password:</label>
                    <input
                        type="password"
                        id="retypePassword"
                        className="form-control"
                        placeholder="Re-type Password"
                        value={retypePassword}
                        onChange={(e) => {
                            setRetypePassword(e.target.value);
                            setRetypePasswordTouched(true);
                        }}
                        required
                    />
                    {retypePasswordTouched && retypePasswordError && <div className="text-danger">{retypePasswordError}</div>}
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={passwordError !== '' || retypePasswordError !== ''}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;