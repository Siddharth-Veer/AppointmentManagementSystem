// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5OX2DPmOkjtmdxTfxlCFrUHafplht7RI",
  authDomain: "medisync-edbd5.firebaseapp.com",
  projectId: "medisync-edbd5",
  storageBucket: "medisync-edbd5.appspot.com",
  messagingSenderId: "473216180050",
  appId: "1:473216180050:web:8b74f63a519706081c648b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail,googleProvider, signInWithPopup };
