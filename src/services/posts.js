//Posts service
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
const POST = {
  date: null,
  title: null,
  content: null,
  by: null,
  username: null,
  avatar: null,
  postId: null,
};
export let post = { ...POST };
/**
 *Adds a post into db root collection 'posts'
 * @param post {Promise<post>}
 * @returns {Promise<boolean>}
 * @throws {Error}
 */
export async function savePost(post) {
  try {
    (await post).date = serverTimestamp();
    console.log("Saved Post: ", post);
    const postCollectionRef = collection(db, "posts");
    const postRef = await addDoc(postCollectionRef, post);
    const docId = postRef.id;
    updateDoc(postRef, { postId: docId });
    return true;
  } catch (error) {
    console.error("Error in savePost:", error);
    throw new Error("Error saving Post");
  }
}

/**
 *Set Post data into an Object. Validates content and title !==null
 * @param {Object} postData
 * @returns {Promise<Object>}
 * @throws {Error}
 */
export async function setPost(postData) {
  try {
    post = await { ...postData };
    if (post.content && post.title) {
      const postObject = post;
      console.log("postObject: ", postObject);
      return postObject;
    } else {
      throw new Error(post.content ? "Title missing" : "Content missing");
    }
  } catch (error) {
    console.error("Post could not be added: ", error.message);
    throw error;
  }
}
//TODO: manage error in below functions
/**
 * Gets all posts form posts collection in db.
 * @returns {Array} an Array with posts data.
 */
export async function getPosts() {
  try {
    const postData = [];
    const postRef = collection(db, "posts");
    const q = query(postRef, orderBy("date"));
    const postSnap = await getDocs(q);
    const postDocs = postSnap.docs;
    if (postDocs) {
      postDocs.forEach((post) => {
        postData.push(post.data());
      });
    } else {
      throw new Error("Error in postOrdered:");
    }
    return postData;
  } catch (error) {
    console.error("query not working", error);
  }
}

/**
 * Gets posts by user id.
 * @param {String} userId
 */
export async function getPostsByUserId(userId) {
  try {
    const q = query(collection(db, "posts"), where("by", "==", userId));
    const posts = await getDocs(q);
    if (posts) {
      return posts.docs;
    } else {
      throw new Error("User has no posts yet");
    }
  } catch (error) {
    console.error("Error getting posts: ", error);
  }
}

/**
 *Gets a single post by its id.
 * @param {String} postId
 */
export async function getPostById(postId) {
  try {
    const postRef = doc(db, "posts", postId);
    const postData = await getDoc(postRef);
    if (postData.exists()) {
      console.log("post data: ", postData.data());
      return postData.data();
    } else {
      throw new Error("This post does not exists");
    }
  } catch (error) {
    console.error("Error finding post: ", error);
    throw error;
  }
}

//Suscription to Posts

export async function suscribeToPosts(updater) {

}
