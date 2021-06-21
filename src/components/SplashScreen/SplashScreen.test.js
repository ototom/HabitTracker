import { render, waitFor } from '@testing-library/react';
import { authContext } from '../../context/auth-context';
import { habitsContext } from '../../context/habits-context';
import SplashScreen from './SplashScreen';

let container = document.getElementById('splash-screen-container');

beforeEach(() => {
    if (!container) {
        container = document.createElement('div');
        container.setAttribute('id', 'splash-screen-container');
        document.body.appendChild(container);
    }
});

it('Starts closing animation after the data has been fetched from the database', () => {
    const { queryByTestId, rerender } = render(
        <authContext.Provider value={{ isLoading: true }}>
            <habitsContext.Provider value={{ isLoading: false }}>
                <SplashScreen />
            </habitsContext.Provider>
        </authContext.Provider>
    );

    expect(queryByTestId(/splash-screen-container/i)).not.toHaveClass(
        'splash-screen--is-closing'
    );

    rerender(<SplashScreen />);

    expect(queryByTestId(/splash-screen-container/i)).toHaveClass(
        'splash-screen--is-closing'
    );
});

it('Unmounts the component after animation finishes', async () => {
    const { queryByTestId } = render(<SplashScreen />);

    await waitFor(() => {
        expect(
            queryByTestId(/splash-screen-container/i)
        ).not.toBeInTheDocument();
    });
});
