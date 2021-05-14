import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import PrivateRoute from '../../components/shared/PrivateRoute/PrivateRoute';
import { authContext } from '../../context/auth-context';

it('Shows content if the user exists', () => {
    const history = createMemoryHistory();

    const { getByText } = render(
        <authContext.Provider value={{ user: ['username'] }}>
            <Router history={history}>
                <PrivateRoute>
                    <p>Content</p>
                </PrivateRoute>
            </Router>
        </authContext.Provider>
    );

    expect(getByText(/content/i)).toBeInTheDocument();
});
it('Redirects to login page if user equals null', () => {
    const history = createMemoryHistory();

    const { queryByText } = render(
        <authContext.Provider value={{ user: null }}>
            <Router history={history}>
                <PrivateRoute>
                    <p>Content</p>
                </PrivateRoute>
            </Router>
        </authContext.Provider>
    );

    expect(queryByText(/content/i)).not.toBeInTheDocument();
});
