import { fireEvent, render, within } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import Sidebar from './Sidebar';
import SidebarCloseBtn from './SidebarCloseBtn';
import SidebarMenu from './SidebarMenu';
import SidebarMenuItem from './SidebarMenuItem';

it('Closes the sidebar when the route changes', () => {
    const history = createMemoryHistory();
    const closeHandler = jest.fn();
    const { getByText } = render(
        <Router history={history}>
            <Sidebar isOpen={true} closeHandler={closeHandler} />
        </Router>
    );

    const link = getByText(/settings/i);

    fireEvent.click(link);

    expect(closeHandler).toHaveBeenCalledTimes(1);
});
it('Has proper styling if sidebar state is open', () => {
    const history = createMemoryHistory();
    const { getByTestId, rerender } = render(
        <Router history={history}>
            <Sidebar isOpen={true} closeHandler={() => {}} />
        </Router>
    );

    const sidebar = getByTestId(/sidebar/i);

    expect(sidebar).toHaveClass('sidebar--is-open');

    rerender(
        <Router history={history}>
            <Sidebar isOpen={false} closeHandler={() => {}} />
        </Router>
    );

    expect(sidebar).not.toHaveClass('sidebar--is-open');
});
it('Closes the sidebar when user clicks the close btn', () => {
    const closeHandler = jest.fn();
    const { getByRole } = render(<SidebarCloseBtn onClick={closeHandler} />);

    const btn = getByRole('button');

    fireEvent.click(btn);

    expect(closeHandler).toHaveBeenCalledTimes(1);
});
it('Renders button or link depending on if the address has been passed', () => {
    const history = createMemoryHistory();
    const { queryByTestId, rerender } = render(
        <Router history={history}>
            <SidebarMenuItem to='/' />
        </Router>
    );

    expect(queryByTestId(/type-link/i)).toBeInTheDocument();
    expect(queryByTestId(/type-button/i)).not.toBeInTheDocument();

    rerender(
        <Router history={history}>
            <SidebarMenuItem onClick={() => {}} />
        </Router>
    );

    expect(queryByTestId(/type-button/i)).toBeInTheDocument();
    expect(queryByTestId(/type-link/i)).not.toBeInTheDocument();
});
it('renders add habit modal when user clicks the button', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'modal-container');
    document.body.appendChild(root);

    const history = createMemoryHistory();
    const closeSidebarHandler = jest.fn();

    const { getByText } = render(
        <Router history={history}>
            <SidebarMenu to='/' closeSidebarHandler={closeSidebarHandler} />
        </Router>
    );

    const showModalBtn = getByText(/Add new habit/i);

    fireEvent.click(showModalBtn);

    const { queryByPlaceholderText } = within(root);

    const formInput = queryByPlaceholderText(/enter habit name/i);
    expect(formInput).toBeInTheDocument();
});
