import { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import AdminDashboard from '../components/AdminDashboard';
import UserDashboard from '../components/UserDashboard';
import {
    fetchUserData,
    fetchAllOrders,
    fetchOrdersByStatus,
    updateOrderStatus,
    handlePay,
} from '../utils/handler';

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
        if (isLoggedIn) {
            fetchUserData(setUserData, setError);
            fetchAllOrders(setFilteredOrders, setError);
        }
    }, [isLoggedIn]);

    const handleOrderCreated = () => {
        fetchUserData(setUserData, setError);
    };

    return (
        <div>
            {userData && (
                userData.role === 'admin' ? (
                    <AdminDashboard
                        fetchOrdersByStatus={(status) => fetchOrdersByStatus(status, setFilteredOrders, setError)}
                        filteredOrders={filteredOrders}
                        updateOrderStatus={(orderId, newStatus) => updateOrderStatus(orderId, newStatus, (status) => fetchOrdersByStatus(status, setFilteredOrders, setError), setError)}
                        fetchAllOrders={() => fetchAllOrders(setFilteredOrders, setError)}
                    />
                ) : (
                    <UserDashboard
                        userData={userData}
                        handlePay={(orderId) => handlePay(orderId, userData, servicePrices, setUserData, setError)}
                        handleOrderCreated={handleOrderCreated}
                    />
                )
            )}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default Dashboard;
