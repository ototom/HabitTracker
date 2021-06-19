import { createContext } from 'react';
import { useCallback, useReducer } from 'react';
import { v4 } from 'uuid';

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'ADD': {
            return [...state, { ...action.payload }];
        }
        case 'DELETE': {
            const filteredState = state.filter(
                (el) => el.id !== action.payload
            );

            return filteredState;
        }
        case 'RESET': {
            return [];
        }
        default:
            return state;
    }
};

export const notificationContext = createContext({
    createNotification: () => {},
    closeNotification: () => {},
    resetNotifications: () => {},
    notifications: [],
});

const NotificationProvider = ({ children }) => {
    const [notifications, dispatch] = useReducer(notificationReducer, []);
    const closeNotification = useCallback((id) => {
        dispatch({ type: 'DELETE', payload: id });
    }, []);

    const createNotification = useCallback((type, message, autoClose) => {
        dispatch({
            type: 'ADD',
            payload: {
                type,
                message,
                autoClose,
                id: v4(),
            },
        });
    }, []);

    const resetNotifications = () => {
        dispatch({ type: 'RESET' });
    };

    return (
        <notificationContext.Provider
            value={{
                createNotification,
                closeNotification,
                resetNotifications,
                notifications,
            }}
        >
            {children}
        </notificationContext.Provider>
    );
};
export default NotificationProvider;
