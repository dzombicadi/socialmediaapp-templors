import { Timestamp, arrayUnion, collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { UserProvider } from "./UserProvider";
import { firebaseFirestore } from "../configuration";

export interface Message {
    uid: string,
    content: string,
    timestamp: Timestamp
}

export class ChatService {

    userId: string
    userService: UserProvider
    constructor(uid: string) {
        this.userId = uid;
        this.userService = new UserProvider(uid);
    }

    private getChatRefById = (otherId: string) => {
        const userDocRef = doc(firebaseFirestore, "users", this.userId);
        const chatCollRef = collection(userDocRef, "chats");
        const chatByIdRef = doc(chatCollRef, otherId);

        return chatByIdRef;
    }

    getChatByUserId = async (otherId: string) => {
        const chatByIdRef = this.getChatRefById(otherId);

        const snap = await getDoc(chatByIdRef);
        if (!snap.exists()) {
            return this.createChat(otherId);
        } else {
            return snap;
        }
    }

    createChat = async (otherId: string) => {
        const chatByIdRef = this.getChatRefById(otherId);

        const snap = await getDoc(chatByIdRef);
        if (!snap.exists()) {
            setDoc(chatByIdRef, {messages: ["Placeholder 1", "Placeholdeer 2"]});
        }
        return snap;
    }

    getChatMessages = async (otherId: string) => {
        const chatData = await this.getChatByUserId(otherId);
        return chatData?.data()?.messages;
    }

    sendChatMessage = async (otherId: string, content: string) => {
        const chatData = await this.getChatRefById(otherId);
        const messagesPayload = {
            user: this.userId,
            content: content,
            timestamp: serverTimestamp()
        };
        await updateDoc(chatData, {
            messages: arrayUnion(messagesPayload)
        });

        console.log("Updated message id: " + otherId);
    }
}