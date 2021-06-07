import { fireEvent, render } from '@testing-library/react';
import AddHabitForm from './AddHabitForm';

let container = document.getElementById('modal-container');

beforeEach(() => {
    if (!container) {
        container = document.createElement('div');
        container.setAttribute('id', 'modal-container');
        document.body.appendChild(container);
    }
});

it('Puts focus on input after render', () => {
    const { getByPlaceholderText } = render(
        <AddHabitForm hideForm={() => {}} />
    );

    expect(getByPlaceholderText(/enter habit name/i)).toHaveFocus();
});
it('Hides the form when user clicks outside of it', () => {
    const hideForm = jest.fn();
    render(<AddHabitForm hideForm={hideForm} />);
    expect(hideForm).toHaveBeenCalledTimes(0);

    fireEvent.click(document.body);
    expect(hideForm).toHaveBeenCalledTimes(1);
});
it('Makes the button disabled when the text field is empty', () => {
    const { getByPlaceholderText, getByRole } = render(
        <AddHabitForm hideForm={() => {}} />
    );

    const btn = getByRole('button');
    const input = getByPlaceholderText(/enter habit name/i);

    expect(btn).toBeDisabled();

    fireEvent.change(input, { target: { value: 'a' } });

    expect(btn).not.toBeDisabled();
});