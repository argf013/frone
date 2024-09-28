import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import CreateOrderForm from '../components/CreateOrderForm';

const LayananDetail = () => {
    const { layananName } = useParams();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        const checkLoginStatus = () => {
            return localStorage.getItem('token') !== null;
        };

        setIsLoggedIn(checkLoginStatus());
    }, []);

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const getDescription = (layananName) => {
        switch (layananName.toLowerCase()) {
            case 'aransemen':
                return 'Deskripsi khusus untuk layanan aransemen.';
            case 'mixing-mastering':
                return 'Deskripsi khusus untuk layanan mixing mastering';
            case 'soundtrack':
                return 'Deskripsi khusus untuk layanan soundtrack';
            default:
                return `Detail informasi tentang layanan ${layananName} akan ditampilkan di sini.`;
        }
    };

    const handleCreateOrder = () => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            const modal = new window.bootstrap.Modal(modalRef.current);
            modal.show();
        }
    };

    const capitalizedLayananName = capitalizeFirstLetter(layananName);
    const description = getDescription(layananName);

    return (
        <div>
            <div className="container mt-5 text-center">
                <h1 className="display-4">{capitalizedLayananName}</h1>
                <p>{description}</p>
                <button className="btn btn-success" onClick={handleCreateOrder}>
                    Create Order
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
                            <CreateOrderForm onOrderCreated={() => { }} modalRef={modalRef} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LayananDetail;