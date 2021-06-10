import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import HabitList from './HabitList';

const HABITS = [
    {
        name: 'test',
        id: '1',
        isCompleted: false,
        date: new Date(2021, 5, 1),
    },
];

it('Toggles the habits when user clicks the list name', () => {
    const history = createMemoryHistory();
    const { getByText, queryByText } = render(
        <Router history={history}>
            <HabitList habits={HABITS} name='To do' />
        </Router>
    );

    const listName = getByText(/to do/i);

    expect(queryByText(/test/i)).toBeInTheDocument();

    fireEvent.click(listName);

    expect(queryByText(/test/i)).not.toBeInTheDocument();
});
it('Shows info if there are no habits provided', () => {
    const history = createMemoryHistory();
    const { queryByText } = render(
        <Router history={history}>
            <HabitList habits={[]} name='To do' />
        </Router>
    );

    const info = queryByText(/this list is empty/i);

    expect(info).toBeInTheDocument();
});
