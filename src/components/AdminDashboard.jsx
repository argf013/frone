/* eslint-disable react/prop-types */
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
            <div className="mb-4 d-flex flex-row gap-2">
                <Link className="btn btn-primary" to="/dashboard/blogs">Manage Blog</Link>
                <Link className="btn btn-secondary" to="/dashboard/gallery">Manage Gallery</Link>
                <Link className='btn btn-warning' to={`/dashboard/chat`}>Chat</Link>
            </div>

            <h4 className="mb-3">Filter Orders</h4>
            <div className="mb-4 flex-row d-flex gap-2">
                <button
                    className="btn btn-primary"
                    onClick={handleFetch}
                    aria-label="Show all items"
                >
                    All
                </button>
                <button
                    className="btn btn-warning"
                    onClick={() => handleStatusFilter('pending')}
                    aria-label="Show pending items"
                >
                    Pending
                </button>
                <button
                    className="btn btn-success"
                    onClick={() => handleStatusFilter('paid')}
                    aria-label="Show paid items"
                >
                    Paid
                </button>
                <button
                    className="btn btn-info"
                    onClick={() => handleStatusFilter('processed')}
                    aria-label="Show processed items"
                >
                    Processed
                </button>
                <button
                    className="btn btn-dark"
                    onClick={() => handleStatusFilter('completed')}
                    aria-label="Show completed items"
                >
                    Completed
                </button>
            </div>

            {filteredOrders.length > 0 ? (
                <div className="accordion mb-5" id="ordersAccordion">
                    {filteredOrders.map((order, index) => {
                        let filePaths = [];
                        try {
                            filePaths = JSON.parse(order.file_path);
                        } catch (e) {
                            console.error('Error parsing file_path:', e);
                        }

                        return (
                            <div className="accordion-item" key={order.id}>
                                <h2 className="accordion-header" id={`heading${index}`}>
                                    <button className="accordion-button bg-light" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                                        Order ID: {order.id}
                                    </button>
                                </h2>
                                <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#ordersAccordion">
                                    <div className="accordion-body">
                                        <p><strong>User:</strong> {order.orderedBy}</p>
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
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default AdminDashboard;