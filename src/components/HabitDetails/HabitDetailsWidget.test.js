import { render } from '@testing-library/react';
import HabitDetailsWidget from './HabitDetailsWidget';

it('Renders the content properly', () => {
    const { getByText } = render(
        <HabitDetailsWidget>Content</HabitDetailsWidget>
    );

    const content = getByText(/content/i);

    expect(content).toBeInTheDocument();
});
it('Renders the header if the prop is passed to the component', () => {
    const { queryByText, rerender } = render(
        <HabitDetailsWidget header='sample header'></HabitDetailsWidget>
    );

    const header = queryByText(/sample header/i);

    expect(header).toBeInTheDocument();

    rerender(<HabitDetailsWidget />);

    expect(header).not.toBeInTheDocument();
});
it('Adds passed CSS classes to the component', () => {
    const { queryByText } = render(
        <HabitDetailsWidget className='test-class'>content</HabitDetailsWidget>
    );

    const wrapper = queryByText(/content/i);

    expect(wrapper).toHaveClass('test-class');
});
