import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API,
    authDomain: process.env.REACT_APP_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
});

export const auth = app.auth();

export default app;
