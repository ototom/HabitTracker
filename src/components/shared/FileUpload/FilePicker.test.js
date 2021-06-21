import { render } from '@testing-library/react';
import FilePicker from './FilePicker';

it('Shows progress indicator when the file is being uploaded', () => {
    const { queryByText, rerender } = render(
        <FilePicker uploadAvatarProgress={23} />
    );

    expect(queryByText(/23%/i)).toBeInTheDocument();

    rerender(<FilePicker uploadAvatarProgress={null} />);

    expect(queryByText(/23%/i)).not.toBeInTheDocument();
});
it('Makes submit button disabled if there is no file or the form is being sent', () => {
    const { getByRole } = render(<FilePicker isLoading={false} file={null} />);

    const submitButton = getByRole('button', { name: 'Update' });

    expect(submitButton).toBeDisabled();
});
