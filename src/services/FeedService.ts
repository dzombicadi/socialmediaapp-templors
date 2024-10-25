import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { UserData } from "./UserProvider";
import { firebaseFirestore } from "../configuration";

export interface PostData {
  id: number;
  user: string;
  userImage: string;
  content: string;
  postImage?: string;
  time: Timestamp;
  likes: number;
  comments: string[];
}

export class FeedService {
  userId: string;

  constructor(uid: string) {
    this.userId = uid;
  }

  feedPost = async (post: PostData) => {
    return addDoc(collection(firebaseFirestore, "posts"), post);
  };

  getAllPosts = async () => {
    return getDocs(collection(firebaseFirestore, "posts"));
  };

  getPostById = async (postId: string) => {
    return getDoc(doc(firebaseFirestore, "posts", postId));
  };

  addComment = async (postId: string, content: string) => {
    try {
      const postRef = doc(firebaseFirestore, "posts", postId);

      await updateDoc(postRef, {
        comments: arrayUnion(content), // Append new comment without overwriting
      });

      console.log("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };
}
