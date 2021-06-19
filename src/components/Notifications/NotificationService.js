import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { notificationContext } from '../../context/notification-context';
import Notification from './Notification';
import './Notification.css';

export const notificationTypes = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    INFO: 'INFO',
    WARNING: 'WARNING',
};

const NotificationService = () => {
    const { closeNotification, notifications } =
        useContext(notificationContext);

    let container = document.getElementById('notification-container');

    if (!container) {
        if (notifications.length === 0) return null;
        container = document.createElement('div');
        container.setAttribute('id', 'notification-container');

        document.body.appendChild(container);
    }

    return createPortal(
        <div className='notification-wrapper'>
            {notifications.map((notify) => (
                <Notification
                    key={notify.id}
                    {...notify}
                    closeNotification={closeNotification}
                />
            ))}
        </div>,
        container
    );
};

export default NotificationService;
