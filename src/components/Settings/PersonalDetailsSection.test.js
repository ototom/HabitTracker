import { fireEvent, render } from '@testing-library/react';
import PersonalDetailsSection from './PersonalDetailsSection';

it('Calls a function with new value upon submitting', () => {
    const updateProfile = jest.fn();

    const { getByRole } = render(
        <PersonalDetailsSection
            user={{ displayName: 'test' }}
            updateProfile={updateProfile}
        />
    );

    const button = getByRole('button');

    fireEvent.click(button);

    expect(updateProfile).toHaveBeenCalledTimes(1);
    expect(updateProfile).toBeCalledWith({ displayName: 'test' });
});
it('Shows username as a text field value initially', () => {
    const { getByLabelText } = render(
        <PersonalDetailsSection user={{ displayName: 'test' }} />
    );

    const input = getByLabelText(/username/i);

    expect(input).toHaveValue('test');
});
