import { render } from '@testing-library/react';
import { authContext } from '../context/auth-context';
import Settings from './Settings';

it('Shows settings only when the user data is present', () => {
    const { queryByDisplayValue, rerender } = render(
        <authContext.Provider
            value={{
                user: { email: 'sample@test.com', displayName: 'testuser' },
            }}
        >
            <Settings />
        </authContext.Provider>
    );

    const usernameInput = queryByDisplayValue(/testuser/i);
    const userEmailInput = queryByDisplayValue(/sample@test.com/i);

    expect(usernameInput).toBeInTheDocument();
    expect(userEmailInput).toBeInTheDocument();

    rerender(<Settings />);

    expect(usernameInput).not.toBeInTheDocument();
    expect(userEmailInput).not.toBeInTheDocument();
});
