import firebase from 'firebase/app';
import 'firebase/storage'
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCq3nLx8t9uiWptcWi5MpjTtcrRJgjWT20",
    authDomain: "social-network-7c6c6.firebaseapp.com",
    databaseURL: "https://social-network-7c6c6.firebaseio.com",
    projectId: "social-network-7c6c6",
    storageBucket: "social-network-7c6c6.appspot.com",
    messagingSenderId: "986861168087",
    appId: "1:986861168087:web:2279f40389deb958975792",
    measurementId: "G-4GJW4H4D4N"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();



export const storage = firebase.storage()
export const auth = firebase.auth();
export const firestore = firebase.firestore()
export const db = firebase.database()