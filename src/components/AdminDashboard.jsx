// components/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = ({
    fetchOrdersByStatus,
    filteredOrders,
    updateOrderStatus,
    fetchAllOrders,
}) => {

    const serviceDescriptions = {
        1: 'Aransemen',
        2: 'Mixing',
        3: 'Mastering',
        4: 'Soundtrack'
    };

    const handleStatusFilter = (status) => {
        fetchOrdersByStatus(status);
    };

    const handleFetch = () => {
        fetchAllOrders();
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <Link className="" to="/dashboard/blogs">Manage Blog</Link>
            <Link className="" to="/dashboard/gallery">Manage Gallery</Link>

            <h2>Filter Orders</h2>
            <button onClick={handleFetch}>All</button>
            <button onClick={() => handleStatusFilter('pending')}>Pending</button>
            <button onClick={() => handleStatusFilter('paid')}>Paid</button>
            <button onClick={() => handleStatusFilter('processed')}>Processed</button>
            <button onClick={() => handleStatusFilter('completed')}>Completed</button>

            {filteredOrders.length > 0 ? (
                <ul>
                    {filteredOrders.map((order) => {
                        let filePaths = [];
                        try {
                            filePaths = JSON.parse(order.file_path);
                        } catch (e) {
                            console.error('Error parsing file_path:', e);
                        }

                        return (
                            <li key={order.id}>
                                <p><strong>Order ID:</strong> {order.id}</p>
                                <p><strong>User ID:</strong> {order.user_id}</p>
                                <p><strong>Service:</strong> {serviceDescriptions[order.service_id] || 'Unknown Service'}</p>
                                <p><strong>Files:</strong></p>
                                <ul>
                                    {filePaths.length > 0 ? (
                                        filePaths.map((file, index) => (
                                            <li key={index}>
                                                <a href={file} target="_blank" rel="noopener noreferrer">File {index + 1}</a>
                                            </li>
                                        ))
                                    ) : (
                                        <p>No files available.</p>
                                    )}
                                </ul>
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
                        );
                    })}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default AdminDashboard;
