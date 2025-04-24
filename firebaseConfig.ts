import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAwWKQ5b9uflET0porqcPjndES0QCXNg7w",
	authDomain: "mypet-ad4f7.firebaseapp.com",
	projectId: "mypet-ad4f7",
	storageBucket: "mypet-ad4f7.firebasestorage.app",
	messagingSenderId: "967896711448",
	appId: "1:967896711448:web:1fb62737e72803b9ff5e6d",
	measurementId: "G-7B7196H9PH",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
