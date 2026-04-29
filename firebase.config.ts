// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB4dpNrLYgaSHqFrLItGkMiqGChUzExoB0",
    authDomain: "streamix-8ccb3.firebaseapp.com",
    projectId: "streamix-8ccb3",
    storageBucket: "streamix-8ccb3.firebasestorage.app",
    messagingSenderId: "326161395206",
    appId: "1:326161395206:web:274c9a675a945730635d87",
    measurementId: "G-09TZWZVJVZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);