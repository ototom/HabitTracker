import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API,
    authDomain: process.env.REACT_APP_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
});

export const firestore = app.firestore();

export const getCurrentTimestamp =
    firebase.firestore.FieldValue.serverTimestamp;
export const arrayRemove = (date) =>
    firebase.firestore.FieldValue.arrayRemove(date);
export const arrayUnion = (date) =>
    firebase.firestore.FieldValue.arrayUnion(date);

export const auth = app.auth();

export default app;
