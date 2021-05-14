import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import Auth from '../../pages/Auth';
import * as hooks from '../../hooks/use-form';

it('Clears errors when user changes between login and sign up mode', () => {
    const history = createMemoryHistory();
    const clearErrors = jest.fn();
    jest.spyOn(hooks, 'useForm').mockImplementation(() => ({
        errors: ['test error'],
        values: { mail: '', password: '' },
        clearErrors,
        onInputChange: () => {},
    }));

    const { getByTestId, getByText } = render(
        <Router history={history}>
            <Auth />
        </Router>
    );

    const link = getByTestId(/change-mode-link/i);

    expect(getByText(/test error/i)).toBeInTheDocument();

    fireEvent.click(link);

    expect(clearErrors).toHaveBeenCalled();
});
