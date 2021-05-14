import { render } from '@testing-library/react';
import Input from '../../components/shared/Input/Input';

it('Displays textarea or input depending on "type" prop', () => {
    const { queryByTestId, rerender } = render(<Input type='textarea' />);

    expect(queryByTestId(/textarea/i)).toBeInTheDocument();
    expect(queryByTestId(/input/i)).not.toBeInTheDocument();

    rerender(<Input />);

    expect(queryByTestId(/textarea/i)).not.toBeInTheDocument();
    expect(queryByTestId(/input/i)).toBeInTheDocument();
});
it('Shows label only if "label" prop is passed', () => {
    const { queryByLabelText, rerender } = render(
        <Input label='test label' id='text' />
    );

    expect(queryByLabelText(/test label/i)).toBeInTheDocument();

    rerender(<Input />);

    expect(queryByLabelText(/test label/i)).not.toBeInTheDocument();
});
