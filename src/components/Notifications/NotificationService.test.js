import { render } from '@testing-library/react';
import { notificationContext } from '../../context/notification-context';
import NotificationService from './NotificationService';

it('Renders provided notifications properly', () => {
    const { getByText } = render(
        <notificationContext.Provider
            value={{
                notifications: [
                    {
                        message: 'notify 1',
                        id: '1',
                    },
                    {
                        message: 'notify 2',
                        id: '2',
                    },
                ],
                closeNotification: () => {},
            }}
        >
            <NotificationService />
        </notificationContext.Provider>
    );

    expect(getByText(/notify 1/i)).toBeInTheDocument();
    expect(getByText(/notify 2/i)).toBeInTheDocument();
});
