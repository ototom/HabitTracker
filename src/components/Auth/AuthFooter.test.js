import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import AuthFooter from './AuthFooter';

const history = createMemoryHistory();
const renderWithRouter = (ui) => ({
    ...render(<Router history={history}>{ui}</Router>),
    history,
});

it("Displays different text depending on if it's login or sign up mode", () => {
    const { getByText, rerender } = renderWithRouter(
        <AuthFooter isLoading={false} isLoginMode={false} />
    );

    expect(getByText(/Already have an account/i)).toBeInTheDocument();

    rerender(
        <Router history={history}>
            <AuthFooter isLoading={false} isLoginMode={true} />
        </Router>
    );
    expect(getByText(/Don't have an account/i)).toBeInTheDocument();
});
it('Makes link disabled when form data is being sent', () => {
    const { getByTestId } = renderWithRouter(
        <AuthFooter isLoading={true} isLoginMode={false} />
    );

    expect(getByTestId(/change-mode-link/i)).toHaveClass('disabled');
});
it("Changes link address depending on if it's login or sign up mode", () => {
    const { getByTestId, rerender } = renderWithRouter(
        <AuthFooter isLoading={false} isLoginMode={false} />
    );

    const link = getByTestId(/change-mode-link/i);

    expect(link.closest('a')).toHaveAttribute('href', '/auth/sign-in');

    rerender(
        <Router history={history}>
            <AuthFooter isLoading={false} isLoginMode={true} />
        </Router>
    );

    expect(link.closest('a')).toHaveAttribute('href', '/auth/sign-up');
});
