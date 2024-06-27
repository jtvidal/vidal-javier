//Posts service
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
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
    console.log("Saved Post: ", post);
    const postCollectionRef = collection(db, "posts");
    const newPostRef = doc(postCollectionRef);
    (await post).postId = newPostRef.id;
    (await post).date = serverTimestamp();
    if ((await post).date !== null && (await post).postId !== null) {
      console.log("post in savePost: ", post);
      await setDoc(newPostRef, post);
    } else {
      throw new Error("Error: date or postId null");
    }
    return true;
  } catch (error) {
    console.error("Error in savePost:", error);
    return false;
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
    let postObject = post;
    postObject = await { ...postData };
    if (postObject.content && postObject.title) {
      if (!postObject.date) {
        throw new Error("Date is null");
      }
      console.log("postObject.date: ", postObject.date);
      return postObject;
    } else {
      throw new Error(postObject.content ? "Title missing" : "Content missing");
    }
  } catch (error) {
    console.error("Post could not be added: ", error.message);
    throw error;
  }
}
//TODO: manage error in below functions

/**
 * Gets posts by user id.
 * @param {String} userId
 */
export async function getPostsByUserId(userId) {
  try {
    const postsData = [];
    const q = query(collection(db, "posts"), where("by", "==", userId));
    const queryOrder = query(q, orderBy("date"));
    // const queryOrder = query(q, orderBy("date"));
    console.log("query: ", queryOrder);
    const postsSnap = await getDocs(queryOrder);
    const postsDocs = postsSnap.docs;
    if (postsDocs) {
      postsDocs.forEach((post) => {
        postsData.push(post.data());
      });
      return postsData;
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

/**
 * Saves edited post
 * @param {String} postId
 * @param {*} newData
 */
export async function editPost(postId, newData) {
  try {
    const postRef = doc(db, `posts/${postId}`);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      await updateDoc(postRef, newData);
    }
    console.log("post in editPost: ", postSnap.data());
  } catch (error) {
    console.error("error in editPost", error.code);
    throw error;
  }
}

/**
 *  Suscribe to all posts in db
 * @param {(posts:{Object}[])=> null} suscription
 * @param {String} id Optional: brings posts from a user id.
 * @returns
 */
export async function suscribeToPosts(suscription, id) {
  let posts = [];
  let qOrder;
  try {
    if (id) {
      qOrder = query(
        collection(db, "posts"),
        where("by", "==", id),
        orderBy("date")
      );
    } else {
      qOrder = query(collection(db, "posts"), orderBy("date"));
    }
    return onSnapshot(qOrder, (postsCollection) => {
      posts = postsCollection.docs.map((post) => {
        const postData = post.data({ serverTimestamps: "estimate" });
        postData.date = postData.date || null;
        return postData;
      });
      console.log("posts in suscribeToPosts", posts);
      suscription(posts);
    });
  } catch (error) {
    console.error("Error in suscribeToPosts: ", error);
  }
}
