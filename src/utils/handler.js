import axios from 'axios';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../utils/firebaseConfig'; // Pastikan path ini benar

const API_BASE_URL = 'http://localhost:3000';

export const fetchUserData = async (setUserData, setError) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found. Please log in.');
        }

        const response = await axios.get(`${API_BASE_URL}/auth/me`, {
            headers: { 'x-access-token': token }
        });

        setUserData(response.data);
    } catch (err) {
        localStorage.removeItem('token');
        setError(err.message || 'An error occurred while fetching user data.');
    }
};

export const fetchAllOrders = async (setFilteredOrders, setError) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/order/`, {
            headers: { 'x-access-token': token }
        });
        setFilteredOrders(response.data);
    } catch (err) {
        setError(err.message || 'An error occurred while fetching all orders.');
    }
};

export const fetchBlogPosts = async () => {
    try {
        const response = await fetch('http://localhost:3000/blogs/posts');
        if (!response.ok) {
            throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        return data; // Pastikan mengembalikan data blog posts
    } catch (error) {
        throw error; // Melemparkan error untuk ditangani di komponen
    }
};

export const fetchBlogPostById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/blogs/posts/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch blog post');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};


export const fetchOrdersByStatus = async (status, setFilteredOrders, setError) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/order/status/${status}`, {
            headers: { 'x-access-token': token }
        });
        setFilteredOrders(response.data);
    } catch (err) {
        setError(err.message || 'An error occurred while fetching orders by status.');
    }
};

export const updateOrderStatus = async (orderId, newStatus, fetchOrdersByStatus, setError) => {
    try {
        const token = localStorage.getItem('token');
        const endpoint = `${API_BASE_URL}/admin/orders/${newStatus}/${orderId}`;

        await axios.put(endpoint, null, {
            headers: { 'x-access-token': token }
        });

        fetchOrdersByStatus(newStatus === 'processed' ? 'paid' : 'processed');
    } catch (err) {
        setError(err.message || 'An error occurred while updating the order status.');
    }
};

export const handlePay = async (orderId, userData, servicePrices, setUserData, setError) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found. Please log in.');
        }

        const { firstName, lastName, email, phone } = userData;
        const order = userData.orders.find(o => o.id === orderId);
        const grossAmount = servicePrices[order.service_id];

        const response = await axios.post(`${API_BASE_URL}/payment/pay`, {
            orderId,
            grossAmount,
            firstName,
            lastName,
            email,
            phone
        }, {
            headers: { 'x-access-token': token }
        });

        if (response.data.invoice.redirect_url) {
            window.location.href = response.data.invoice.redirect_url;
        } else {
            throw new Error('Redirect URL not found in response.');
        }

        const userResponse = await axios.get(`${API_BASE_URL}/auth/me`, {
            headers: { 'x-access-token': token }
        });
        setUserData(userResponse.data);
    } catch (err) {
        setError(err.message || 'An error occurred while processing payment.');
    }
};

export const createBlogPost = async (blog, setBlogPosts, setError) => {
    try {
        const token = localStorage.getItem('token');
        await axios.post(`${API_BASE_URL}/blogs/admin/posts/`, blog, {
            headers: { 'x-access-token': token }
        });

        fetchBlogPosts(setBlogPosts, setError);
    } catch (err) {
        setError(err.message || 'An error occurred while creating blog post.');
    }
};

export const editBlogPost = async (id, blog, setBlogPosts, setError) => {
    try {
        const token = localStorage.getItem('token');
        await axios.put(`${API_BASE_URL}/blogs/admin/posts/${id}`, blog, {
            headers: { 'x-access-token': token }
        });

        fetchBlogPosts(setBlogPosts, setError);
    } catch (err) {
        setError(err.message || 'An error occurred while editing blog post.');
    }
};

export const deleteBlogPost = async (id, setBlogPosts, setError) => {
    try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/blogs/admin/posts/${id}`, {
            headers: { 'x-access-token': token }
        });

        fetchBlogPosts(setBlogPosts, setError);
    } catch (err) {
        setError(err.message || 'An error occurred while deleting blog post.');
    }
};

export const uploadImage = async (file, title, token) => {
    try {
        if (!file) throw new Error('No file selected.');

        // Create a storage reference
        const storageRef = ref(storage, `images/${file.name}`);

        // Upload the file
        await uploadBytes(storageRef, file);

        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);

        // Upload image details to the server
        const response = await axios.post('http://localhost:3000/gallery/postGallery',
            { title, image_path: downloadURL },
            { headers: { 'x-access-token': token } }
        );

        return response.data;
    } catch (error) {
        throw new Error(`Error uploading image: ${error.message}`);
    }
};

export const deleteImage = async (id, token) => {
    try {
        await axios.delete(`http://localhost:3000/gallery/deleteGallery/${id}`,
            { headers: { 'x-access-token': token } }
        );
    } catch (error) {
        throw new Error(`Error deleting image: ${error.message}`);
    }
};

export const fetchImages = async () => {
    try {
        const response = await axios.get('http://localhost:3000/gallery/getGallery');
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching gallery images: ${error.message}`);
    }
};