import { fireEvent, render } from '@testing-library/react';
import HabitDetailsFooter from './HabitDetailsFooter';

let container = document.getElementById('modal-container');

beforeEach(() => {
    if (!container) {
        container = document.createElement('div');
        container.setAttribute('id', 'modal-container');
        document.body.appendChild(container);
    }
});

it('Shows confirm dialog upon click delete button', () => {
    const { getByTestId, queryByText } = render(<HabitDetailsFooter />);

    const btn = getByTestId(/button-delete/i);

    expect(
        queryByText(/Do you really want to delete this item/i)
    ).not.toBeInTheDocument();

    fireEvent.click(btn);

    expect(
        queryByText(/Do you really want to delete this item/i)
    ).toBeInTheDocument();
});
it('Shows edit modal upon click edit button', () => {
    const { getByTestId, queryByPlaceholderText } = render(
        <HabitDetailsFooter habitName='test value' />
    );

    const btn = getByTestId(/button-edit/i);

    expect(queryByPlaceholderText(/Enter habit name/i)).not.toBeInTheDocument();

    fireEvent.click(btn);

    expect(queryByPlaceholderText(/Enter habit name/i)).toBeInTheDocument();
    expect(queryByPlaceholderText(/Enter habit name/i)).toHaveValue(
        'test value'
    );
});
