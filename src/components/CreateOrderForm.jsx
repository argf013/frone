/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import { storage } from '../utils/firebaseConfig'; // Import storage dari konfigurasi Firebase
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const serviceOptions = [
    { id: 1, name: 'Aransemen' },
    { id: 2, name: 'Mixing' },
    { id: 3, name: 'Mastering' },
    { id: 4, name: 'Soundtrack' }
];

const CreateOrderForm = ({ onOrderCreated }) => {
    const API_BASE_URL = 'http://localhost:3000';
    const [serviceId, setServiceId] = useState('');
    const [files, setFiles] = useState([]); // Simpan file yang dipilih
    const [orderDate, setOrderDate] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleFileChange = (event) => {
        setFiles(event.target.files); // Set file yang dipilih ke state (multiple files)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found. Please log in.');
            }

            // Upload multiple files to Firebase Storage and get download URLs
            const uploadPromises = Array.from(files).map(async (file) => {
                const fileRef = ref(storage, `orders/${file.name}`);
                await uploadBytes(fileRef, file);

                // Get the download URL for the uploaded file
                const downloadURL = await getDownloadURL(fileRef);
                return downloadURL;
            });

            const fileUrls = await Promise.all(uploadPromises);

            // Pastikan fileUrls tidak null atau undefined
            if (!fileUrls.length) {
                throw new Error('No files were uploaded.');
            }

            // Create the order
            await axios.post(`${API_BASE_URL}/order/create`, {
                serviceId,
                filePaths: fileUrls, // Menggunakan array URL dari Firebase sebagai filePaths
                orderDate,
                firstName,
                lastName,
                email,
                phone,
                message
            }, {
                headers: { 'x-access-token': token }
            });

            setSuccess('Order created successfully.');
            setError(null);

            if (onOrderCreated) {
                onOrderCreated();
            }

        } catch (err) {
            console.error("Error creating order:", err);
            setError(err.message || 'An error occurred while creating the order.');
        }
    };

    return (
        <div className="container mt-4 mb-5">
            <h1>Create New Order</h1>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label htmlFor="serviceId" className="form-label">Service:</label>
                    <select
                        id="serviceId"
                        className="form-select"
                        value={serviceId}
                        onChange={(e) => setServiceId(e.target.value)}
                        required
                    >
                        <option value="">Select a service</option>
                        {serviceOptions.map(option => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="filePath" className="form-label">Upload Files:</label>
                    <input
                        type="file"
                        id="filePath"
                        className="form-control"
                        onChange={handleFileChange}
                        multiple // Support multiple files
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="orderDate" className="form-label">Order Date:</label>
                    <input
                        type="date"
                        id="orderDate"
                        className="form-control"
                        value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        className="form-control"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message:</label>
                    <textarea
                        id="message"
                        className="form-control"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows="4"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Order</button>
            </form>
            {success && <p className="text-success mt-3">{success}</p>}
            {error && <p className="text-danger mt-3">{error}</p>}
        </div>
    );
};

export default CreateOrderForm;