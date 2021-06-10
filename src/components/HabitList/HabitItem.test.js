import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import HabitItem from './HabitItem';

const HABITS = {
    name: 'test',
    id: '1',
    isCompleted: false,
    date: new Date(2021, 5, 1),
};

it('Mark habit as selected if the address includes habit ID', () => {
    const history = createMemoryHistory({ initialEntries: ['/habits?id=1'] });
    const { getByTestId } = render(
        <Router history={history}>
            <HabitItem habit={HABITS} />
        </Router>
    );

    const element = getByTestId(/habit-item/i);

    expect(element).toHaveClass('habit-list__item--active');
});
it('Calls a passed function when user clicks the checkbox', () => {
    const onCheckboxClick = jest.fn();
    const history = createMemoryHistory();
    const { getByRole } = render(
        <Router history={history}>
            <HabitItem habit={HABITS} onCheckboxClick={onCheckboxClick} />
        </Router>
    );

    const btn = getByRole('button');

    fireEvent.click(btn);

    expect(onCheckboxClick).toHaveBeenCalledTimes(1);
});
it("Mark habit as completed if passed habit's prop isCompleted is set to TRUE", () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
        <Router history={history}>
            <HabitItem
                habit={{
                    name: 'test',
                    id: '1',
                    isCompleted: true,
                    date: new Date(2021, 5, 1),
                }}
                onCheckboxClick={() => {}}
            />
        </Router>
    );

    const element = getByTestId(/habit-item/i);

    expect(element).toHaveClass('checked');
});
it('Renders the link with proper address', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
        <Router history={history}>
            <HabitItem habit={HABITS} onCheckboxClick={() => {}} />
        </Router>
    );

    const link = getByText(/test/i);

    expect(link).toHaveAttribute('href', '/?id=1');
});
