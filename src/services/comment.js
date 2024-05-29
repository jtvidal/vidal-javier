/*
TODO: 
    - create exportable object Comment
    - create function to save comment in comments db (subcollection of posts).
*/

import { addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
const COMMENT = {
  id: null,
  content: null,
  by: null,
  username:null,
  avatar: null,
  inPost: null,
  date: null,
};

export let comment = { ...COMMENT };

//TODO: suscriber to notify new comments

/**
 *Adds a new comment doc to the comments collection in db
 * @param c {Promise<comment>} Object comment
 */
export async function saveComment(c) {
  // comment = { ...c };
  try {
    const commentsColRef = collection(db, `posts/${(await c).inPost}/comments`);
    if (commentsColRef) {
      const commentRef = await addDoc(commentsColRef, c);
      const commentId = commentRef.id;
      updateDoc(commentRef, { id: commentId });
      return true;
    } else {
      throw new Error("Error in reference, Post not found");
    }
  } catch (error) {
    console.error("Comment could not be saved: ", error);
  }
}

//TODO: get comments from a post by id

/**
 * Gets all comments form a post by the post document id
 * @param {Promise<String>} id 
 */
export async function getCommentsByPostId(id){


}
