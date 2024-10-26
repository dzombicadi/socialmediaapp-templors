import { Timestamp, doc, getDoc } from "firebase/firestore"
import { firebaseFirestore } from "../configuration"

interface UserData {
    email: string,
    name: string,
    registerTime: Timestamp,
    lastLogin: Timestamp
}

class UserProvider {

    userId: string

    constructor(uid: string) {
        this.userId = uid
    };

    getUser = async () => {
        return getDoc(doc(firebaseFirestore, "users", this.userId))
    }

    userExists = async () => {
        return (await this.getUser()).exists();
    }

}

export { UserData, UserProvider}