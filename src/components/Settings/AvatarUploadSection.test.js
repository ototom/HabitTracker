import { render } from '@testing-library/react';
import AvatarUploadSection from './AvatarUploadSection';

it('Shows placeholder if there is no file', () => {
    const { getByText } = render(<AvatarUploadSection />);

    const placeholder = getByText(/Pick an image/i);

    expect(placeholder).toBeInTheDocument();
});
