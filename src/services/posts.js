//Posts service
import { addDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
const POST = {
  date: null,
  title: null,
  content: null,
  by: null,
};
export let post = { ...POST };
/**
 *
 * @param {Promise<Object>} post
 */
export async function savePost(post) {
  const postData = await setPost(post, post);
}
export function setPost(title, content) {
  try {
    if (content !== null) {
      post.title = title;
      post.content = content;
      return post;
    } else {
      throw new Error("No content added");
    }
  } catch (error) {
    console.error("Post could not be setted: ", error);
    throw error;
  }
}
