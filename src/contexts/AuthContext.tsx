import { User, UserCredential, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseAuth, firebaseFirestore } from "../configuration";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {

    const [uid, setUID] = useState<string | null>(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        const subscribe = onAuthStateChanged(firebaseAuth, (authUser: User | null) => {
            setUID(authUser ? authUser.uid : "undef");
            setPending(false);
        });
        return subscribe;
    }, []);

    const registerUser = async (email: string, password: string, firstName: string, lastName: string) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCreds: UserCredential) => {
            if (userCreds.user) {
                setDoc(doc(firebaseFirestore, "users", userCreds.user.uid), 
                {
                    email: userCreds.user.email,
                    firstName: firstName,
                    lastName: lastName,
                    registerTime: serverTimestamp(),
                    lastLogin: serverTimestamp()
                }, { merge: true })
            }
        });
    }
    
    const loginUser = async (email: string, password: string) => {
        return signInWithEmailAndPassword(firebaseAuth, email, password);
    }

    const logout = async () => {
        setUID(null);
        return signOut(firebaseAuth);
    }

    const value = {
        uid,
        registerUser,
        loginUser
    };

    return (
        <AuthContext.Provider value={value}>
          {!pending && children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => {
    return useContext(AuthContext);
}