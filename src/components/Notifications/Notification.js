import { useState, useEffect } from 'react';
import { notificationTypes } from './NotificationService';

const Notification = ({ id, type, message, closeNotification, autoClose }) => {
    const [timer, setTimer] = useState(4000);
    const [isMouseOn, setIsMouseOn] = useState(false);

    useEffect(() => {
        if (autoClose === false) return;

        let timerId;
        if (timer > 0 && !isMouseOn) {
            timerId = setInterval(() => {
                setTimer((prev) => prev - 250);
            }, 250);

            return () => clearInterval(timerId);
        } else if (isMouseOn) {
            clearInterval(timerId);
        } else {
            closeNotification(id);
        }
    }, [closeNotification, id, timer, isMouseOn, autoClose]);

    return (
        <div
            onMouseEnter={() => setIsMouseOn(true)}
            onMouseLeave={() => setIsMouseOn(false)}
            className={`notification ${
                type === notificationTypes.ERROR
                    ? 'notification__error'
                    : type === notificationTypes.INFO
                    ? 'notification__info'
                    : type === notificationTypes.SUCCESS
                    ? 'notification__success'
                    : 'notification__warning'
            }`}
        >
            {message}
            <button
                className='notification__close-button'
                onClick={closeNotification.bind(this, id)}
            >
                X
            </button>
        </div>
    );
};

export default Notification;
