import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';
import CreateOrderForm from '../components/CreateOrderForm';

const serviceDescriptions = {
    1: 'Aransemen',
    2: 'Mixing',
    3: 'Mastering',
    4: 'Soundtrack'
};

const servicePrices = {
    1: 1500000,
    2: 1500000,
    3: 1500000,
    4: 2000000
};

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [error, setError] = useState(null);
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found. Please log in.');
                }

                const response = await axios.get('http://localhost:3000/auth/me', {
                    headers: { 'x-access-token': token }
                });

                setUserData(response.data);
            } catch (err) {
                localStorage.removeItem('token');
                setError(err.message || 'An error occurred while fetching user data.');
            }
        };

        if (isLoggedIn) {
            fetchUserData();
            fetchAllOrders(); // Load all orders initially
        }
    }, [isLoggedIn]);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found. Please log in.');
            }

            const response = await axios.get('http://localhost:3000/auth/me', {
                headers: { 'x-access-token': token }
            });

            setUserData(response.data);
        } catch (err) {
            setError(err.message || 'An error occurred while fetching user data.');
        }
    };

    const fetchAllOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/order', {
                headers: { 'x-access-token': token }
            });
            setFilteredOrders(response.data);
        } catch (err) {
            setError(err.message || 'An error occurred while fetching orders.');
        }
    };

    const fetchOrdersByStatus = async (status) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:3000/order/status/${status}`, {
                headers: { 'x-access-token': token }
            });
            setFilteredOrders(response.data);
        } catch (err) {
            setError(err.message || 'An error occurred while fetching orders by status.');
        }
    };

    const handleStatusFilter = (status) => {
        if (status === 'all') {
            fetchAllOrders();
        } else {
            fetchOrdersByStatus(status);
        }
    };

    const handleOrderCreated = () => {
        fetchUserData(); // Re-fetch user data to get the updated order list
    };


    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const endpoint = `http://localhost:3000/admin/orders/${newStatus}/${orderId}`;

            await axios.put(endpoint, null, {
                headers: { 'x-access-token': token }
            });

            // Refetch orders to update the list
            fetchOrdersByStatus(newStatus === 'processed' ? 'paid' : 'processed');
        } catch (err) {
            setError(err.message || 'An error occurred while updating the order status.');
        }
    };

    const handlePay = async (orderId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found. Please log in.');
            }

            const { firstName, lastName, email, phone } = userData;
            const order = userData.orders.find(o => o.id === orderId);
            const grossAmount = servicePrices[order.service_id];

            console.log('Sending payment request with data:', {
                orderId,
                grossAmount,
                firstName,
                lastName,
                email,
                phone
            });

            const response = await axios.post('http://localhost:3000/payment/pay', {
                orderId,
                grossAmount,
                firstName,
                lastName,
                email,
                phone
            }, {
                headers: { 'x-access-token': token }
            });

            // Redirect user to the payment page
            if (response.data.invoice.redirect_url) {
                window.location.href = response.data.invoice.redirect_url;
            } else {
                throw new Error('Redirect URL not found in response.');
            }

            // Optionally, refetch the user data to update the order status
            const userResponse = await axios.get('http://localhost:3000/auth/me', {
                headers: { 'x-access-token': token }
            });
            setUserData(userResponse.data);
        } catch (err) {
            console.error('Error processing payment:', err.message || 'An error occurred while processing payment.');
            setError(err.message || 'An error occurred while processing payment.');
        }
    };



    if (error) {
        return <div>Error: {error}</div>;
        localStorage.removeItem('token');
    }

    if (!userData) {
        return <div>Loading...</div>;
        localStorage.removeItem('token');
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>User Information</h2>
            <p><strong>ID:</strong> {userData.id}</p>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Role:</strong> {userData.role}</p>

            {userData.role === 'admin' ? (
                <div>
                    <h2>Dashboard</h2>

                    <h2>Filter Orders</h2>
                    <button onClick={() => handleStatusFilter('all')}>All</button>
                    <button onClick={() => handleStatusFilter('pending')}>Pending</button>
                    <button onClick={() => handleStatusFilter('paid')}>Paid</button>
                    <button onClick={() => handleStatusFilter('processed')}>Processed</button>
                    <button onClick={() => handleStatusFilter('completed')}>Completed</button>

                    {filteredOrders.length > 0 ? (
                        <ul>
                            {filteredOrders.map((order) => (
                                <li key={order.id}>
                                    <p><strong>Order ID:</strong> {order.id}</p>
                                    <p><strong>User ID:</strong> {order.user_id}</p>
                                    <p><strong>Service:</strong> {serviceDescriptions[order.service_id] || 'Unknown Service'}</p>
                                    <p><strong>File Path:</strong> {order.file_path}</p>
                                    <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
                                    <p><strong>Status:</strong> {order.status}</p>
                                    <p><strong>Queue Number:</strong> {order.queue_number}</p>
                                    <p><strong>Created At:</strong> {new Date(order.created_at).toLocaleDateString()}</p>

                                    {order.status === 'paid' && (
                                        <button onClick={() => updateOrderStatus(order.id, 'processed')}>Mark as Processed</button>
                                    )}

                                    {order.status === 'processed' && (
                                        <button onClick={() => updateOrderStatus(order.id, 'completed')}>Mark as Completed</button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No orders found.</p>
                    )}
                </div>
            ) : (
                <div>
                    <CreateOrderForm onOrderCreated={handleOrderCreated} />

                    <h2>Order Lists</h2>
                    {userData.orders.length > 0 ? (
                        <ul>
                            {userData.orders.map((order) => (
                                <li key={order.id}>
                                    <p><strong>Order ID:</strong> {order.id}</p>
                                    <p><strong>Order Service:</strong> {serviceDescriptions[order.service_id] || 'Unknown Service'}</p>
                                    <p><strong>Status:</strong> {order.status}</p>
                                    {order.status === 'pending' && (
                                        <button onClick={() => handlePay(order.id)}>Pay</button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No orders found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
