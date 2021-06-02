import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import Button from './Button';

it('Displays <Link /> or <button> depending on variant prop', () => {
    const history = createMemoryHistory();
    const { getByText, rerender } = render(
        <Router history={history}>
            <Button variant='link' to='/'>
                Test button
            </Button>
        </Router>
    );

    expect(getByText(/test button/i)).toHaveAttribute('href');

    rerender(<Button variant='button'>Test button</Button>);

    expect(getByText(/test button/i)).not.toHaveAttribute('href');
});
it('Calls a passed function on click if the variant is "button"', () => {
    const onClick = jest.fn();

    const { getByText } = render(<Button onClick={onClick}>test</Button>);

    fireEvent.click(getByText(/test/i));

    expect(onClick).toHaveBeenCalledTimes(1);
});
