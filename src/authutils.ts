import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth"
import { firebaseAuth, firebaseFirestore } from "./configuration"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"

export const createUser = async (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
    .then((userCreds: UserCredential) => {
        setDoc(doc(firebaseFirestore, "users", userCreds.user.uid), {
            email: email,
            name: "NAME",
            surname: "SURNAME",
            dob: "1. 1. 1970.",
            status: "Online",
            registerTime: serverTimestamp()
        }, { merge: true })
    }).catch((err) => {
        console.log("Error from createUser: " + err);
    });
}

export const loginUser = async (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
}

