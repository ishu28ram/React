import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAN-C4uVuCCaur1LRr51dZl04LI9gk_NlY",
  authDomain: "zapcart--clone.firebaseapp.com",
  projectId: "zapcart--clone",
  storageBucket: "zapcart--clone.appspot.com",
  messagingSenderId: "355241143031",
  appId: "1:355241143031:web:a70f4585d5e953178781f2",
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, storage, googleProvider };
