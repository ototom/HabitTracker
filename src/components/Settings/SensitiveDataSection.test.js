import { fireEvent, render } from '@testing-library/react';
import SensitiveDataSection from './SensitiveDataSection';

it("Shows user's email as a text field value initially", () => {
    const updateSensitiveData = jest.fn();
    const { getByLabelText } = render(
        <SensitiveDataSection
            user={{ email: 'test@test.com' }}
            updateSensitiveData={updateSensitiveData}
        />
    );

    const input = getByLabelText(/email/i);

    expect(input).toHaveValue('test@test.com');
});
it('Returns error if new password was not repeated', () => {
    const updateSensitiveData = jest.fn();
    const { getByLabelText, queryByText, getByRole } = render(
        <SensitiveDataSection
            user={{ email: 'test@test.com' }}
            updateSensitiveData={updateSensitiveData}
        />
    );

    const newPasswordField = getByLabelText(/new password$/i);
    const newPasswordConfirmField = getByLabelText(/new password - confirm/i);
    const confirmChangesField = getByLabelText(/confirm changes/i);
    const button = getByRole('button');

    fireEvent.change(newPasswordField, { target: { value: 'testtest' } });
    fireEvent.change(confirmChangesField, { target: { value: 'test' } });
    fireEvent.click(button);

    expect(queryByText(/Password must be repeated/i)).toBeInTheDocument();

    fireEvent.change(newPasswordConfirmField, {
        target: { value: 'testtest' },
    });
    fireEvent.click(button);

    expect(
        queryByText(/confirmChanges field is required/i)
    ).not.toBeInTheDocument();
});
it("Returns error if new password doesn't contain at least 6 characters", () => {
    const updateSensitiveData = jest.fn();
    const { getByLabelText, queryByText, getByRole } = render(
        <SensitiveDataSection
            user={{ email: 'test@test.com' }}
            updateSensitiveData={updateSensitiveData}
        />
    );

    const newPasswordField = getByLabelText(/new password$/i);
    const confirmChangesField = getByLabelText(/confirm changes/i);
    const button = getByRole('button');

    fireEvent.change(newPasswordField, { target: { value: 'test' } });
    fireEvent.change(confirmChangesField, { target: { value: 'test' } });
    fireEvent.click(button);

    expect(
        queryByText(/Password field must contain at least 6 characters/i)
    ).toBeInTheDocument();

    fireEvent.change(newPasswordField, {
        target: { value: 'testtest' },
    });
    fireEvent.click(button);

    expect(
        queryByText(/Password field must contain at least 6 characters/i)
    ).not.toBeInTheDocument();
});
it('Returns error if new password and repeated password do not match', () => {
    const updateSensitiveData = jest.fn();
    const { getByLabelText, queryByText, getByRole } = render(
        <SensitiveDataSection
            user={{ email: 'test@test.com' }}
            updateSensitiveData={updateSensitiveData}
        />
    );

    const newPasswordField = getByLabelText(/new password$/i);
    const newPasswordConfirmField = getByLabelText(/new password - confirm/i);
    const confirmChangesField = getByLabelText(/confirm changes/i);
    const button = getByRole('button');

    fireEvent.change(newPasswordField, { target: { value: 'testtest' } });
    fireEvent.change(confirmChangesField, { target: { value: 'test' } });
    fireEvent.change(newPasswordConfirmField, {
        target: { value: 'testtes' },
    });
    fireEvent.click(button);

    expect(queryByText(/Passwords do not match/i)).toBeInTheDocument();

    fireEvent.change(newPasswordConfirmField, {
        target: { value: 'testtest' },
    });
    fireEvent.click(button);

    expect(queryByText(/Passwords do not match/i)).not.toBeInTheDocument();
});
it('Calls updateSensitiveData function upon submitting valid form', () => {
    const updateSensitiveData = jest.fn();
    const { getByLabelText } = render(
        <SensitiveDataSection
            user={{ email: 'test@test.com' }}
            updateSensitiveData={updateSensitiveData}
        />
    );

    const input = getByLabelText(/email/i);

    expect(input).toHaveValue('test@test.com');
});
it('Returns error if new password was not repeated', () => {
    const updateSensitiveData = jest.fn();
    const { getByLabelText, getByRole } = render(
        <SensitiveDataSection
            user={{ email: 'test@test.com' }}
            updateSensitiveData={updateSensitiveData}
        />
    );

    const newPasswordField = getByLabelText(/new password$/i);
    const newPasswordConfirmField = getByLabelText(/new password - confirm/i);
    const confirmChangesField = getByLabelText(/confirm changes/i);
    const button = getByRole('button');

    fireEvent.change(newPasswordField, { target: { value: 'testtest' } });
    fireEvent.change(newPasswordConfirmField, {
        target: { value: 'testtest' },
    });
    fireEvent.change(confirmChangesField, { target: { value: 'test' } });
    fireEvent.click(button);

    expect(updateSensitiveData).toHaveBeenCalledTimes(1);
    expect(updateSensitiveData).toBeCalledWith(
        { password: 'test' },
        {
            email: 'test@test.com',
            password: 'testtest',
        }
    );
});
