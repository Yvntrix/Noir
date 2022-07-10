import firebase from "firebase/compat/app";

import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDp-UrM8RPWi74i6sXAgtW82RP8PgiTTk8",
    authDomain: "noir-hide.firebaseapp.com",
    projectId: "noir-hide",
    storageBucket: "noir-hide.appspot.com",
    messagingSenderId: "930989037927",
    appId: "1:930989037927:web:45804335fc50f82249f7c2"
};
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();