import { Timestamp, addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { UserData } from "./UserProvider";
import { firebaseFirestore } from "../configuration";

export interface PostData {
    id: number,
    user: string,
    userImage: string,
    content: string,
    postImage?: string,
    time: Timestamp,
    likes: number,
    comments: string[],
}

export class FeedService {
    userId: string;

    constructor(uid: string) {
        this.userId = uid;
    }

    feedPost = async (post: PostData) => {
        return addDoc(collection(firebaseFirestore, "posts"), post);
    }

    getAllPosts = async () => {
        return getDocs(collection(firebaseFirestore, "posts"));
    }

    getPostById = async (postId: string) => {
        return getDoc(doc(firebaseFirestore, "posts", postId));
    }

    addComment = async (postId: string, content: string) => {
        const post = await this.getPostById(postId);
        if (post === undefined) {;
            console.log("Could not find post to add comment to, postId: " + postId);
        }
        const current = post.data()?.comments;
        return updateDoc(doc(firebaseFirestore, "posts", postId), {
            comments: [...current, content]
        });
    }

};