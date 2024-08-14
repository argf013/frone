import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Layout = () => {
    const { isLoggedIn, logout } = useAuth();

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/blogs">Blogs</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    {isLoggedIn ? (
                        <>
                            <li>
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <button onClick={logout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                </ul>
            </nav>

            <Outlet />
        </>
    );
};

export default Layout;
