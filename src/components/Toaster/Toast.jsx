import React, { useEffect } from 'react';
import './Toaster.css';

const Toast = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000); // Auto-dismiss after 3s
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="custom-toast">
            {message} 
        </div>
    );
};

export default Toast;
