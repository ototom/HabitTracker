import { fireEvent, render } from '@testing-library/react';
import MobileTopBar from './MobileTopBar';

it('Calls a function when user clicks the button', () => {
    const openSidebarHandler = jest.fn();

    const { getByRole } = render(
        <MobileTopBar openSidebarHandler={openSidebarHandler} />
    );

    const btn = getByRole('button');

    fireEvent.click(btn);

    expect(openSidebarHandler).toHaveBeenCalledTimes(1);
});
