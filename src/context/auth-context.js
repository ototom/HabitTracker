import { createContext, useState } from 'react';

export const authContext = createContext({
    user: null,
    signIn: () => {},
    signUp: () => {},
    logout: () => {},
});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const signIn = () => {};
    const signUp = () => {};
    const logout = () => {};

    return (
        <authContext.Provider value={{ user, signIn, signUp, logout }}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;
