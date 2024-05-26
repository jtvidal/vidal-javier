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
 */
export async function savePost(post) {
  console.log("Saved Post: ", post);
  const postCollectionRef = collection(db, "posts");
  await addDoc(postCollectionRef, post);
  return true;
}

/**
 *Set Post data into an Object
 * @param {Promise<Object>}
 * @returns {Object}
 */
export async function setPost(postData) {
  try {
    post = await { ...postData };
    const postObject = post;
    console.log("postObject: ", postObject);
    if (postObject.content !== null) {
      return postObject;
    } else {
      throw new Error("No content added");
    }
  } catch (error) {
    console.error("Post could not be added: ", error);
    throw error;
  }
}
