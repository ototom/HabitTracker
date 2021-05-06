import { createContext, useState } from 'react';
import { auth } from '../firebase';

export const authContext = createContext({
    user: null,
    signIn: () => {},
    signUp: () => {},
    logout: () => {},
});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubstribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            }
        });

        return () => unsubstribe();
    }, []);

    const signIn = (email, password) =>
        auth.signInWithEmailAndPassword(email, password);

    const signUp = (email, password) =>
        auth.createUserWithEmailAndPassword(email, password);

    const logout = () => auth.signOut();

    return (
        <authContext.Provider value={{ user, signIn, signUp, logout }}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;
