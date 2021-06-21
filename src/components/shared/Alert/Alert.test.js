import { render } from '@testing-library/react';
import Alert from './Alert';

it('Renders properly passed array of errors', () => {
    const { queryByText } = render(
        <Alert errors={['test error 1', 'test error 2']} />
    );

    expect(queryByText(/test error 1/i)).toBeInTheDocument();
    expect(queryByText(/test error 2/i)).toBeInTheDocument();
});
