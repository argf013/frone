import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BlogDetail from "./components/BlogDetail";
import Artist from "./pages/Artist";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "../src/main.css";
import { AuthProvider } from "./utils/AuthContext";
import Layanan from "./pages/Layanan";
import Gallery from "./pages/Gallery";
import Tentang from "./pages/Tentang";
import RegisterPage from "./pages/Register";
import BlogDashboard from "./pages/admin/BlogDashboard";
import EditBlog from "./pages/admin/EditBlog"; // Import komponen EditBlog
import GalleryDashboard from "./pages/admin/GalleryDashboard";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="blogs" element={<Blogs />} />
                    <Route path="blogs/:id" element={<BlogDetail />} />
                    <Route path="layanan" element={<Layanan />} />
                    <Route path="artist" element={<Artist />} />
                    <Route path="gallery" element={<Gallery />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signUp" element={<RegisterPage />} />
                    <Route path="tentang" element={<Tentang />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="dashboard/blogs" element={<BlogDashboard />} />
                    <Route path="dashboard/gallery" element={<GalleryDashboard />} />
                    <Route path="dashboard/blogs/edit/:id" element={<EditBlog />} /> {/* Tambahkan route ini */}
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </AuthProvider>
    </BrowserRouter>
);
