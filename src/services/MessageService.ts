import { Timestamp, addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { UserProvider } from "./UserProvider.ts";
import { firebaseFirestore } from "../configuration";

export interface Message {
    uid: string,
    content: string,
    timestamp: Timestamp
}

export const getChatRef = () => {
    return collection(firebaseFirestore, "chats");
}

export const getChat = async (chatId: string) => {
    const chatsRef = getChatRef();
    return await getDoc(doc(chatsRef, chatId));
}

const getChatsWithUsers = async (userId: string, otherId: string) => {
    const chatsRef = getChatRef();
    const q = query(chatsRef, where("users." + userId, "==", true), where("users." + otherId, "==", true));
    return getDocs(q);
}

const createChat = async (userId: string, otherId: string) => {
    const chatsRef = getChatRef();
    var dataPayload = {};
    dataPayload["users"] = {
        [userId]: true,
        [otherId]: true
    }
    dataPayload["messages"] = [];
    return addDoc(chatsRef, dataPayload);
}

export const createOrGetChat = async (userId: string, otherId: string) => {
    const chats = await getChatsWithUsers(userId, otherId);
    console.log("chats empty: " + chats.empty);
    console.log(chats.size);
    console.log(chats.docs.forEach((doc) => console.log("docId: " + doc.id)))
    if (chats.empty) {
        const created = await createChat(userId, otherId);
        return created;
    } else {
        return chats.docs.at(0);
    }
}