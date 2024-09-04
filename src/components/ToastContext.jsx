/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useCallback } from 'react';
import Toast from './Toast';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, []);

    const addToast = useCallback((message, severity, life) => {
        const id = Date.now();
        setToasts((prevToasts) => [...prevToasts, { id, message, severity, life }]);
        setTimeout(() => removeToast(id), life || 3000);
    }, [removeToast]);

    return (
        <ToastContext.Provider value={addToast}>
            {children}
            <div className="toast-container position-fixed bottom-0 end-0 p-3">
                {toasts.map((toast) => (
                    <Toast key={toast.id} message={toast.message} severity={toast.severity} life={toast.life} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    return useContext(ToastContext);
};