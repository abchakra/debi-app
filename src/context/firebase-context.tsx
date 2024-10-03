// FirebaseContext.tsx
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { onValue, ref, update } from 'firebase/database';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase';
import { Guest, GuestTableRow } from '../types';

interface FirebaseContextProps {
    user: User | null;
    signIn: (email: string, password: string) => Promise<void>;
    signOutUser: () => Promise<void>;
    guests: GuestTableRow[];
    updateData: (id: string, newData: Guest) => void;

}

const FirebaseContext = createContext<FirebaseContextProps | undefined>(undefined);

export const useFirebase = (): FirebaseContextProps => {
    const context = useContext(FirebaseContext);
    if (!context) {
        throw new Error('useFirebase must be used within a FirebaseProvider');
    }
    return context;
};

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [guests, setGuests] = useState<any>(null);

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user) {
            // Reference to Realtime Database, change path based on user or other criteria
            const dataRef = ref(db, `guests/`);
            onValue(dataRef, (snapshot) => {
                const dbData = snapshot.val();
                const newGuestList: GuestTableRow[] = [];
                console.log("Set new Guest list !")
                for (let id in dbData) {
                    newGuestList.push({ id, ...dbData[id] });
                }
                setGuests(newGuestList);
            });
        }
    }, [user]);

    const signIn = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const signOutUser = async () => {
        await signOut(auth);
    };

    const updateData = (id: string, newData: Guest) => {
        if (user) {
            const dataRef = ref(db, `guests/${id}`);
            // set(dataRef, newData);
            update(dataRef, newData).then(() => {
                console.log("Data updated successfully");
            })
                .catch((error: any) => {
                    console.log("Unsuccessful");
                    console.log(error);
                });
        }
    };

    return (
        <FirebaseContext.Provider value={{ user, signIn, signOutUser, guests, updateData }}>
            {children}
        </FirebaseContext.Provider>
    );
};
