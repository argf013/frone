import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { useToast } from './ToastContext'; // Import useToast hook
import BalconistLogo from '../assets/Balconist.svg';
import './Navbar.css';

const NavBar = () => {
    const { isLoggedIn, logout } = useAuth();
    const addToast = useToast(); // Get the addToast function

    // Inline styles for the navbar
    const navbarStyle = {
        backgroundColor: 'rgb(217, 218, 190)',
        color: '#fff', // White text color
        zIndex: 1000, // Ensure navbar is on top of other content
        position: 'sticky', // Stick to the top of the page
        top: 0, // Align to the top
        width: '100%' // Full width
    };

    const handleLogout = () => {
        logout();
        addToast('Logout berhasil', 'primary', 3000); // Show success toast
    };

    return (
        <nav className="navbar navbar-expand-lg" style={navbarStyle}>
            <div className="container-sm custom-container">
                <a className="navbar-brand" href="/">
                    <img className="logo-nav" src={BalconistLogo} style={{ width: '70px', height: '70px' }} alt="Logo" />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarText"
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm0-5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm0-5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11z" />
                    </svg>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 h6">
                        <li className="nav-item">
                            <Link className="nav-link px-4" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link px-4" to="/blogs">Blogs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link px-4" to="/artist">Artist</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link px-4" to="/layanan">Layanan</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link px-4" to="/gallery">Gallery</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link px-4" to="/tentang">Tentang</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signUp">Daftar</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;