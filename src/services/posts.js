//Posts service
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
const POST = {
  date: null,
  title: null,
  content: null,
  by: null,
  postId: null,
};
export let post = { ...POST };
/**
 *Adds a post into db root collection 'posts'
 * @param post {Promise<Object>}
 * @returns {Promise<boolean>}
 * @throws {Error}
 */
export async function savePost(post) {
  try {
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
  const postSnap = await getDocs(collection(db, "posts"));
  const postData = [];
  postSnap.forEach((post) => {
    postData.push(post.data());
  });
  return postData;
}

/**
 * Gets posts by user id.
 * @param {String} id
 */
export async function getPostsById(id) {
  const q = query(collection(db, "posts"), where("by", "==", id));
  const posts = await getDocs(q);
  return posts;
}
