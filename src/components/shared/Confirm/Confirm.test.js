import { fireEvent, render } from '@testing-library/react';
import Confirm from './Confirm';

let container = document.getElementById('modal-container');

beforeEach(() => {
    if (!container) {
        container = document.createElement('div');
        container.setAttribute('id', 'modal-container');
        document.body.appendChild(container);
    }
});

it('Renders heading properly if it is passed as a prop', () => {
    const { getByRole } = render(
        <Confirm heading='header'>Test content</Confirm>
    );

    const header = getByRole('heading', { name: 'header' });

    expect(header).toBeInTheDocument();
});
it('Renders content properly', () => {
    const { getByText } = render(<Confirm>Test content</Confirm>);

    expect(getByText(/test content/i)).toBeInTheDocument();
});
it('Calls a function if user clicks the confirm button', () => {
    const onConfirm = jest.fn();
    const { getByRole } = render(
        <Confirm onConfirm={onConfirm}>Test content</Confirm>
    );

    const button = getByRole('button', { name: 'Confirm' });

    fireEvent.click(button);

    expect(onConfirm).toHaveBeenCalledTimes(1);
});
it('Calls a function if user clicks the cancel button', () => {
    const onCancel = jest.fn();
    const { getByRole } = render(
        <Confirm onCancel={onCancel}>Test content</Confirm>
    );

    const button = getByRole('button', { name: 'Cancel' });

    fireEvent.click(button);

    expect(onCancel).toHaveBeenCalledTimes(1);
});
