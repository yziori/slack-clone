// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyC6BAsO4lHVVkEzysvuYnOHRX94mIWKwCQ",
	authDomain: "slack-clone-4c09d.firebaseapp.com",
	projectId: "slack-clone-4c09d",
	storageBucket: "slack-clone-4c09d.appspot.com",
	messagingSenderId: "1094158389357",
	appId: "1:1094158389357:web:b579eea188b7b5fdec2f64",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };
