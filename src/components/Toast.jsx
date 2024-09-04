/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { CheckCircleIcon, AlertIcon } from '@primer/octicons-react';
import './Toast.css'; // Import the CSS file

const Toast = ({ message, severity = 'primary', life = 3000 }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (life > 0) {
            const timer = setTimeout(() => setShow(false), life);
            return () => clearTimeout(timer);
        }
    }, [life]);

    if (!show) return null;

    const severityClass = severity ? `bg-${severity}` : '';
    const visibilityClass = show ? 'show' : 'hide';

    return (
        <div className={`toast align-items-center ${severityClass} ${visibilityClass}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
                <div className="toast-body text-white">
                    {severity === 'primary' && <CheckCircleIcon size={16} className='me-2' />}
                    {severity === 'danger' && <AlertIcon size={16} className='me-2' />}
                    <span>{message}</span>
                </div>
            </div>
        </div>
    );
};

export default Toast;