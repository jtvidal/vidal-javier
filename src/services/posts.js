//Posts service
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
const POST = {
  date: null,
  title: null,
  content: null,
  by: null,
};
export let post = { ...POST };
/**
 *Adds a post into db root collection 'posts'
 * @param {Promise<Object>} post
 * @returns {Promise<boolean>}
 */
export async function savePost(post) {
  try {
    console.log("Saved Post: ", post);
    const postCollectionRef = collection(db, "posts");
    await addDoc(postCollectionRef, post);
    return true;
  } catch (error) {
    console.error("Error in savePost:", error);
    throw new Error("Error saving Post");
  }
}

/**
 *Set Post data into an Object
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