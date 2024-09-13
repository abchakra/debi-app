
import { initializeApp } from 'firebase/app';
import {
    NextOrObserver,
    User,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirebaseConfig } from './firebase-config';


// Intitialize Firebase
const app = initializeApp(getFirebaseConfig());
export const db = getDatabase()
const auth = getAuth(app);

export const signInUser = async (
    email: string,
    password: string
) => {
    if (!email && !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const userStateListener = (callback: NextOrObserver<User>) => {
    return onAuthStateChanged(auth, callback)
}

export const SignOutUser = async () => await signOut(auth);
