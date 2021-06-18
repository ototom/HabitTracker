import { render } from '@testing-library/react';
import { habitsContext } from '../../context/habits-context';
import HabitDetails from './HabitDetails';

it('Shows placeholder if there is no id', () => {
    const { getByText } = render(<HabitDetails />);

    expect(
        getByText(/Click the habit title to view its details/i)
    ).toBeInTheDocument();
});
it("Shows placeholder if there is id but is hasn't been found", () => {
    const getHabitById = jest.fn(() => undefined);
    const { getByText } = render(
        <habitsContext.Provider value={{ getHabitById }}>
            <HabitDetails id='1' />
        </habitsContext.Provider>
    );

    expect(getHabitById).toHaveBeenCalledTimes(1);
    expect(getHabitById).toHaveBeenCalledWith('1');
    expect(
        getByText(/Click the habit title to view its details/i)
    ).toBeInTheDocument();
});
it('Shows sidebar with details when the id was provided and habit has been found', () => {
    const getHabitById = jest.fn(() => ({
        id: '1',
        name: 'test habit',
        checkedDays: [],
    }));
    const { getByText, queryByText } = render(
        <habitsContext.Provider value={{ getHabitById, deleteHabit: () => {} }}>
            <HabitDetails id='1' />
        </habitsContext.Provider>
    );

    expect(getHabitById).toHaveBeenCalledTimes(1);
    expect(getHabitById).toHaveBeenCalledWith('1');
    expect(
        queryByText(/Click the habit title to view its details/i)
    ).not.toBeInTheDocument();
    expect(getByText(/test habit/i)).toBeInTheDocument();
});
