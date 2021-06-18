import { fireEvent, render } from '@testing-library/react';
import { habitsContext } from '../../context/habits-context';
import HabitForm from './HabitForm';

let container = document.getElementById('modal-container');

beforeEach(() => {
    if (!container) {
        container = document.createElement('div');
        container.setAttribute('id', 'modal-container');
        document.body.appendChild(container);
    }
});

it('Puts focus on input after render', () => {
    const { getByPlaceholderText } = render(<HabitForm hideForm={() => {}} />);

    expect(getByPlaceholderText(/enter habit name/i)).toHaveFocus();
});
it('Hides the form when user clicks outside of it', () => {
    const hideForm = jest.fn();
    render(<HabitForm hideForm={hideForm} />);
    expect(hideForm).toHaveBeenCalledTimes(0);

    fireEvent.click(document.body);
    expect(hideForm).toHaveBeenCalledTimes(1);
});
it('Makes the button disabled when the text field is empty', () => {
    const { getByPlaceholderText, getByRole } = render(
        <HabitForm hideForm={() => {}} />
    );

    const btn = getByRole('button');
    const input = getByPlaceholderText(/enter habit name/i);

    expect(btn).toBeDisabled();

    fireEvent.change(input, { target: { value: 'a' } });

    expect(btn).not.toBeDisabled();
});

it('Loads initial value if the data is provided', () => {
    const { getByPlaceholderText } = render(
        <HabitForm hideForm={() => {}} initialValue='test value' />
    );

    const input = getByPlaceholderText(/enter habit name/i);

    expect(input).toHaveValue('test value');
});
it("Calls edit function when the habit's id is provided", () => {
    const addNewHabit = jest.fn();
    const editHabit = jest.fn();
    const { getByRole, getByPlaceholderText } = render(
        <habitsContext.Provider value={{ addNewHabit, editHabit }}>
            <HabitForm hideForm={() => {}} initialValue='test value' id='1' />
        </habitsContext.Provider>
    );

    const btn = getByRole('button');
    const input = getByPlaceholderText(/enter habit name/i);

    fireEvent.change(input, { target: { value: 'changed value' } });
    fireEvent.click(btn);

    expect(editHabit).toHaveBeenCalledTimes(1);
    expect(addNewHabit).not.toHaveBeenCalled();
});
it('Calls add function when there is no habit id', () => {
    const addNewHabit = jest.fn();
    const editHabit = jest.fn();
    const { getByRole, getByPlaceholderText } = render(
        <habitsContext.Provider value={{ addNewHabit, editHabit }}>
            <HabitForm hideForm={() => {}} />
        </habitsContext.Provider>
    );

    const btn = getByRole('button');
    const input = getByPlaceholderText(/enter habit name/i);

    fireEvent.change(input, { target: { value: 'changed value' } });
    fireEvent.click(btn);

    expect(addNewHabit).toHaveBeenCalledTimes(1);
    expect(editHabit).not.toHaveBeenCalled();
});

it("Doesn't call any function when user submits the same data which was provided initially", () => {
    const addNewHabit = jest.fn();
    const editHabit = jest.fn();
    const { getByRole, getByPlaceholderText } = render(
        <habitsContext.Provider value={{ addNewHabit, editHabit }}>
            <HabitForm hideForm={() => {}} initialValue='test' id='1' />
        </habitsContext.Provider>
    );

    const btn = getByRole('button');
    const input = getByPlaceholderText(/enter habit name/i);

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(btn);

    expect(addNewHabit).not.toHaveBeenCalled();
    expect(editHabit).not.toHaveBeenCalled();
});
