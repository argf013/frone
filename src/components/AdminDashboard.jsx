import React from 'react';
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
        <div className="container mt-4">
            <h2 className="mb-4">Admin Dashboard</h2>
            <div className="mb-4">
                <Link className="btn btn-primary me-2" to="/dashboard/blogs">Manage Blog</Link>
                <Link className="btn btn-secondary" to="/dashboard/gallery">Manage Gallery</Link>
            </div>

            <h4 className="mb-3">Filter Orders</h4>
            <div className="btn-group mb-4">
                <button className="btn btn-outline-primary" onClick={handleFetch}>All</button>
                <button className="btn btn-outline-warning" onClick={() => handleStatusFilter('pending')}>Pending</button>
                <button className="btn btn-outline-success" onClick={() => handleStatusFilter('paid')}>Paid</button>
                <button className="btn btn-outline-info" onClick={() => handleStatusFilter('processed')}>Processed</button>
                <button className="btn btn-outline-dark" onClick={() => handleStatusFilter('completed')}>Completed</button>
            </div>

            {filteredOrders.length > 0 ? (
                <ul className="list-group">
                    {filteredOrders.map((order) => {
                        let filePaths = [];
                        try {
                            filePaths = JSON.parse(order.file_path);
                        } catch (e) {
                            console.error('Error parsing file_path:', e);
                        }

                        return (
                            <li className="list-group-item mb-3" key={order.id}>
                                <h5 className="mb-2">Order ID: {order.id}</h5>
                                <p><strong>User ID:</strong> {order.user_id}</p>
                                <p><strong>Service:</strong> {serviceDescriptions[order.service_id] || 'Unknown Service'}</p>
                                <p><strong>Files:</strong></p>
                                <ul className="list-unstyled">
                                    {filePaths.length > 0 ? (
                                        filePaths.map((file, index) => (
                                            <li key={index}>
                                                <a href={file} target="_blank" rel="noopener noreferrer" className="text-primary">File {index + 1}</a>
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
                                    <button className="btn btn-warning me-2" onClick={() => updateOrderStatus(order.id, 'processed')}>Mark as Processed</button>
                                )}

                                {order.status === 'processed' && (
                                    <button className="btn btn-success" onClick={() => updateOrderStatus(order.id, 'completed')}>Mark as Completed</button>
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
