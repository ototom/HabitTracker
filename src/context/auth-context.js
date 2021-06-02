import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

export const authContext = createContext({
    user: null,
    signIn: () => {},
    signUp: () => {},
    logout: () => {},
});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const signIn = (email, password) =>
        auth.signInWithEmailAndPassword(email, password);

    const signUp = (email, password, displayName) =>
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                result.user.updateProfile({ displayName });
            })
            .catch((error) => {
                // TODO: send notification to the user
                console.log(error);
            });

    const logout = () => {
        setUser(null);
        auth.signOut();
    };

    return (
        <authContext.Provider value={{ user, signIn, signUp, logout }}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;
