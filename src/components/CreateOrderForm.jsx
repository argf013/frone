import React, { useState } from 'react';
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
            await axios.post('http://localhost:3000/order/create', {
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
        <div>
            <h1>Create New Order</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="serviceId">Service:</label>
                    <select
                        id="serviceId"
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
                <div>
                    <label htmlFor="filePath">Upload Files:</label>
                    <input
                        type="file"
                        id="filePath"
                        onChange={handleFileChange}
                        multiple // Support multiple files
                        required
                    />
                </div>
                <div>
                    <label htmlFor="orderDate">Order Date:</label>
                    <input
                        type="date"
                        id="orderDate"
                        value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows="4"
                        required
                    />
                </div>
                <button type="submit">Create Order</button>
            </form>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CreateOrderForm;
