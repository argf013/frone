/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import CreateOrderForm from '../components/CreateOrderForm';
import { AlertFillIcon, PlusIcon } from '@primer/octicons-react';

const serviceDescriptions = {
    1: 'Aransemen',
    2: 'Mixing',
    3: 'Mastering',
    4: 'Soundtrack'
};

const UserDashboard = ({ userData, handleOrderCreated, handlePay }) => {
    const modalRef = useRef(null); // Reference to the modal element

    if (!userData) {
        return <div className="container mt-4"><p>Loading...</p></div>;
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between">
                {userData.orders.length > 0 && (
                    <Link className='btn btn-primary' to={`/dashboard/chat`}>Chat</Link>
                )}
                <button
                    className='btn btn-success d-flex align-items-center gap-1'
                    data-bs-toggle="modal"
                    data-bs-target="#createOrderModal"
                >
                    <PlusIcon /> Order
                </button>
            </div>

            <div className="modal fade" id="createOrderModal" tabIndex="-1" aria-labelledby="createOrderModalLabel" aria-hidden="true" ref={modalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="createOrderModalLabel">Create New Order</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <CreateOrderForm onOrderCreated={handleOrderCreated} modalRef={modalRef} />
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="mt-4">Order Lists</h2>
            {userData.orders.length > 0 ? (
                <div className="accordion my-4" id="orderAccordion">
                    {userData.orders.map((order, index) => {
                        let filePaths = [];
                        try {
                            filePaths = JSON.parse(order.file_path);
                        } catch (e) {
                            console.error('Error parsing file_path:', e);
                        }

                        return (
                            <div className="accordion-item" key={order.id}>
                                <h2 className="accordion-header" id={`heading${index}`}>
                                    <button
                                        className="accordion-button bg-white"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse${index}`}
                                        aria-expanded="true"
                                        aria-controls={`collapse${index}`}
                                    >
                                        Order ID: {order.id}
                                    </button>
                                </h2>
                                <div
                                    id={`collapse${index}`}
                                    className="accordion-collapse collapse"
                                    aria-labelledby={`heading${index}`}
                                    data-bs-parent="#orderAccordion"
                                >
                                    <div className="accordion-body">
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
                                        <p><strong>Order By:</strong> {order.orderedBy}</p>
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
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="mt-3 text-center text-dark-emphasis">
                    <AlertFillIcon size={100} />
                    <h5 className="mt-2">No orders found, let&rsquo;s get started with your first order!</h5>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;