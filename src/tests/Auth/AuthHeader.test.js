import { render } from '@testing-library/react';
import AuthHeader from '../../components/Auth/AuthHeader';

it("Displays different text depending on if it's login or sign up mode", () => {
    const { getByText, rerender } = render(<AuthHeader isLoginMode={false} />);

    expect(getByText(/sign up/i)).toBeInTheDocument();

    rerender(<AuthHeader isLoginMode={true} />);

    expect(getByText(/login/i)).toBeInTheDocument();
});
