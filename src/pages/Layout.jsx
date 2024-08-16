import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar'; // Pastikan path ini sesuai dengan lokasi NavBar.js

const Layout = () => {
    return (
        <>
            <NavBar /> {/* Menyertakan komponen NavBar di bagian atas */}
            <main>
                <Outlet /> {/* Tempat untuk merender konten rute anak */}
            </main>
        </>
    );
};

export default Layout;
