import { doc, getDoc } from "firebase/firestore"
import { firebaseFirestore } from "../configuration"

interface UserData {
    email: string,
    firstName: string,
    lastName: string,
    registerTime: string,
    lastLogin: string
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

export const getUserData = async (userId) => {
    const user = await new UserProvider(userId).getUser();
    if (user.exists()) {
        return {
            email: user.data().email,
            firstName: user.data().firstName,
            lastName: user.data().lastName,
            registerTime: new Date(user.data().registerTime.toDate()).toLocaleString(),
            lastLogin: new Date(user.data().lastLogin.toDate()).toLocaleString()
        } as UserData;
    }
}

export { UserData, UserProvider}