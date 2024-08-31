import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer'; // Pastikan path ini sesuai dengan lokasi Footer.js

const Layout = () => {
    return (
        <div className='vh-100 d-flex flex-column'>
            <NavBar /> {/* Menyertakan komponen NavBar di bagian atas */}
            <div className='flex-grow-1'>
                <Outlet /> {/* Tempat untuk merender konten rute anak */}
            </div>
            <Footer /> {/* Menyertakan komponen Footer di bagian bawah */}
        </div>
    );
};

export default Layout;