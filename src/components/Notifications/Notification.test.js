import { fireEvent, render } from '@testing-library/react';
import Notification from './Notification';

it('Calls closeNotification function when user clicks the close button', () => {
    const closeNotification = jest.fn();
    const { getByRole } = render(
        <Notification id='1' closeNotification={closeNotification} />
    );

    const button = getByRole('button');

    fireEvent.click(button);

    expect(closeNotification).toHaveBeenCalledTimes(1);
});
it('Renders properly with provided message', () => {
    const closeNotification = jest.fn();

    const { getByText } = render(
        <Notification
            closeNotification={closeNotification}
            message='test message'
        />
    );

    expect(getByText(/test message/i)).toBeInTheDocument();
});
