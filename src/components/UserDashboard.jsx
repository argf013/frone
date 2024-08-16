import React from 'react';
import CreateOrderForm from '../components/CreateOrderForm';

const serviceDescriptions = {
    1: 'Aransemen',
    2: 'Mixing',
    3: 'Mastering',
    4: 'Soundtrack'
};

const UserDashboard = ({ userData, handleOrderCreated, handlePay }) => {
    if (!userData) {
        return <div className="container mt-4"><p>Loading...</p></div>;
    }

    return (
        <div className="container mt-4">
            <CreateOrderForm onOrderCreated={handleOrderCreated} />

            <h2 className="mt-4">Order Lists</h2>
            {userData.orders.length > 0 ? (
                <ul className="list-group mt-3">
                    {userData.orders.map((order) => {
                        let filePaths = [];
                        try {
                            filePaths = JSON.parse(order.file_path);
                        } catch (e) {
                            console.error('Error parsing file_path:', e);
                        }

                        return (
                            <li key={order.id} className="list-group-item mb-3">
                                <p><strong>Order ID:</strong> {order.id}</p>
                                <p><strong>Service:</strong> {serviceDescriptions[order.service_id] || 'Unknown Service'}</p>
                                <p><strong>Files:</strong></p>
                                <ul className="list-unstyled">
                                    {filePaths.length > 0 ? (
                                        filePaths.map((file, index) => (
                                            <li key={index}>
                                                <a href={file} target="_blank" rel="noopener noreferrer">
                                                    File {index + 1}
                                                </a>
                                            </li>
                                        ))
                                    ) : (
                                        <p>No files available.</p>
                                    )}
                                </ul>
                                <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
                                <p><strong>Status:</strong> {order.status}</p>
                                <p><strong>Message:</strong> {order.message}</p>
                                <p><strong>Queue Number:</strong> {order.queue_number}</p>
                                <p><strong>Created At:</strong> {new Date(order.created_at).toLocaleDateString()}</p>

                                {order.status === 'pending' && (
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handlePay(order.id)}
                                    >
                                        Pay
                                    </button>
                                )}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className="mt-3">No orders found.</p>
            )}
        </div>
    );
};

export default UserDashboard;
