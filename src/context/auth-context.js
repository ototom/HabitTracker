import { createContext, useEffect, useState } from 'react';
import { auth, storage } from '../firebase';
import firebase from 'firebase/app';

export const authContext = createContext({
    user: null,
    signIn: () => {},
    signUp: () => {},
    logout: () => {},
    uploadAvatarProgress: null,
    updateProfile: () => {},
    updateSensitiveData: () => {},
});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [uploadAvatarProgress, setUploadAvatarProgress] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signIn = (email, password) => {
        setIsLoading(true);
        return auth
            .signInWithEmailAndPassword(email, password)
            .finally(() => setIsLoading(false));
    };

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

    const updateProfile = (updatedProfile) => {
        auth.currentUser
            .updateProfile(updatedProfile)
            .then(() => {
                // TODO: push notification
                setUser((prevUser) => ({ ...prevUser, ...updatedProfile }));
            })
            .catch((error) => {
                // TODO: push notification
                console.log(error);
            });
    };

    const updateSensitiveData = async (
        oldValues = { password: '' },
        newValues = { email: '', password: '' }
    ) => {
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            oldValues.password
        );
        try {
            await auth.currentUser.reauthenticateWithCredential(credential);

            if (oldValues.password && newValues.password) {
                await auth.currentUser.updatePassword(newValues.password);
                // TODO: push notification
            }

            if (oldValues.password && newValues.email) {
                await auth.currentUser.updateEmail(newValues.email);
                setUser((prevUser) => ({
                    ...prevUser,
                    email: newValues.email,
                }));
                // TODO: push notification
            }
        } catch (error) {
            return error.message;
        }
    };

    const updateAvatar = (image, onCompleteUpload) => {
        const uploadTask = storage
            .ref(`/images/${user.uid}/${image.name}`)
            .put(image);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                setUploadAvatarProgress(
                    Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                );
            },
            (error) => {
                // TODO: push notification
                console.log(error);
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    auth.currentUser.updateProfile({
                        photoURL: url,
                    });

                    setUser((prevUser) => ({
                        ...prevUser,
                        photoURL: url,
                    }));
                    setUploadAvatarProgress(null);
                    onCompleteUpload();
                });
            }
        );
    };

    return (
        <authContext.Provider
            value={{
                user,
                signIn,
                signUp,
                logout,
                updateProfile,
                updateAvatar,
                uploadAvatarProgress,
                updateSensitiveData,
                isLoading,
            }}
        >
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;
