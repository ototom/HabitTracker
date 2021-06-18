import { fireEvent, render } from '@testing-library/react';
import HabitDetailsHeader from './HabitDetailsHeader';

it('Calls passed function when user clicks the button', () => {
    const closeHandler = jest.fn();
    const { getByRole } = render(
        <HabitDetailsHeader closeHandler={closeHandler} />
    );

    fireEvent.click(getByRole('button'));

    expect(closeHandler).toHaveBeenCalledTimes(1);
});
