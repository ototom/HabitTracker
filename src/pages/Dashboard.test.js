import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import Dashboard from './Dashboard';

let container = document.getElementById('splash-screen-container');

beforeEach(() => {
    if (!container) {
        container = document.createElement('div');
        container.setAttribute('id', 'splash-screen-container');
        document.body.appendChild(container);
    }
});

it('Shows 404 route if user enters non-existing path', () => {
    const history = createMemoryHistory({
        initialEntries: ['/non-existing-path'],
    });
    const { queryByText } = render(
        <Router history={history}>
            <Dashboard />
        </Router>
    );

    expect(queryByText(/not found/i)).toBeInTheDocument();
});
it('Shows successfully habits page when user enters the address without additional routes', () => {
    const history = createMemoryHistory({
        initialEntries: ['/'],
    });
    const { queryByText } = render(
        <Router history={history}>
            <Dashboard />
        </Router>
    );
    expect(queryByText(/There are no habits yet/i)).toBeInTheDocument();
});
