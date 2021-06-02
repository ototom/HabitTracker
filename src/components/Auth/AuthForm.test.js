import { fireEvent, render } from '@testing-library/react';
import AuthForm from './AuthForm';

it('Calls onSubmit fn when the form is filled and the button is clicked', () => {
    const submitHandler = jest.fn((e) => e.preventDefault());
    const { getByText } = render(
        <AuthForm
            isLoginMode={true}
            submitHandler={submitHandler}
            errors={[]}
            values={{ mail: '', password: '' }}
            onInputChange={() => {}}
        />
    );

    const btn = getByText(/login/i);

    fireEvent.click(btn);

    expect(submitHandler).toHaveBeenCalledTimes(1);
});
it('Shows alert when errors are passed to the component', () => {
    const submitHandler = jest.fn((e) => e.preventDefault());
    const { getByText } = render(
        <AuthForm
            isLoginMode={true}
            submitHandler={submitHandler}
            errors={['test error']}
            values={{ mail: '', password: '' }}
            onInputChange={() => {}}
        />
    );

    expect(getByText(/test error/i)).toBeInTheDocument();
    expect(getByText(/there are following errors/i)).toBeInTheDocument();
});
it('Makes inputs disabled when the form is being sent', () => {
    const submitHandler = jest.fn((e) => e.preventDefault());
    const { getByPlaceholderText } = render(
        <AuthForm
            isLoginMode={true}
            isLoading={true}
            submitHandler={submitHandler}
            errors={['test error']}
            values={{ mail: '', password: '' }}
            onInputChange={() => {}}
        />
    );

    const mail = getByPlaceholderText(/Enter your email address/i);
    const password = getByPlaceholderText(/Enter password/i);

    expect(mail).toHaveAttribute('disabled');
    expect(password).toHaveAttribute('disabled');
});
it("Shows different text content of the button depending on if it's login or sign up mode", () => {
    const submitHandler = jest.fn((e) => e.preventDefault());
    const { getByRole, rerender } = render(
        <AuthForm
            isLoginMode={true}
            isLoading={false}
            submitHandler={submitHandler}
            errors={[]}
            values={{ mail: '', password: '' }}
            onInputChange={() => {}}
        />
    );

    const btn = getByRole('button');

    expect(btn).toHaveTextContent(/login/i);

    rerender(
        <AuthForm
            isLoginMode={false}
            isLoading={false}
            submitHandler={submitHandler}
            errors={[]}
            values={{ mail: '', password: '' }}
            onInputChange={() => {}}
        />
    );

    expect(btn).toHaveTextContent(/sign up/i);
});
it('Makes button disabled and adds proper styling when the form is being sent', () => {
    const submitHandler = jest.fn((e) => e.preventDefault());
    const { getByRole } = render(
        <AuthForm
            isLoginMode={true}
            isLoading={true}
            submitHandler={submitHandler}
            errors={[]}
            values={{ mail: '', password: '' }}
            onInputChange={() => {}}
        />
    );

    const btn = getByRole('button');

    expect(btn).toHaveClass('btn--loading');
    expect(btn).toHaveAttribute('disabled');
});
it('Updates input value when user enters the text', () => {
    const onInputChange = jest.fn();
    const submitHandler = jest.fn((e) => e.preventDefault());
    const { getByRole } = render(
        <AuthForm
            isLoginMode={true}
            isLoading={true}
            submitHandler={submitHandler}
            errors={[]}
            values={{ mail: '', password: '' }}
            onInputChange={onInputChange}
        />
    );

    const mailInput = getByRole('textbox', { name: 'Email:' });

    expect(mailInput).toHaveTextContent('');

    fireEvent.change(mailInput, { target: { value: 'test' } });

    expect(onInputChange).toHaveBeenCalled();
});
