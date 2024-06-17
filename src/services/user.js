import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
export let userAuth = {
  id: null,
  email: null,
  username: null,
  avatar: null,
};
export const apiUrl = {
  randomNames: "https://randomuser.me/api/?results=",
  multiAvatar: "https://api.multiavatar.com/",
};
export const dbUser = {
  credentials: { ...userAuth },
  first: null,
  last: null,
  description: null,
};
/**
 * Recieves an Authenticated user and creates a user document
 * by User.uid in the users collection.
 * @param {Object} userData
 */
export async function setUser(userData) {
  try {
    if (userData.id !== null) {
      const userRef = doc(db, "users", userData.id);
      userAuth = userData;
      dbUser.credentials = { ...userAuth };
      await setDoc(userRef, dbUser);
      return true
    } else {
      throw new Error("User could not be registered, user.uid === null");
    }
  } catch (error) {
    console.error('Error in setUser (user.js): ',error);
    return false;
  }
}

/**
 * Recieves user credentials and sets them to null.
 * @param user {userAuth}
 */
export function resetUserCredentials(user) {
  try {
    user.id = null;
    user.avatar = null;
    user.email = null;
    user.username = null;
    console.log("User Credentials reseted.");
  } catch (error) {
    console.error("Error in resetUserCredentials: ", error);
  }
}

/**
 * Gets user by id from db.
 * @param {String} id
 * @returns {Promise<dbUser>}
 * @error If user is not found in db
 */
export async function getUserById(id) {
  try {
    const userRef = doc(db, "users", id);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      return userData;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error getting user by id: ", error);
    throw error;
  }
}

/**
 * Edits user info in db, when it finishes returns true
 * @param {String} id 
 * @param {user} newData 
 * @returns {boolean} true when editing its over
 */
export async function editUserById(id, newData) {
  try {
    const userRef = doc(db, `users/${id}`);
    console.log("userRef in editUserById: ", userRef);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      await updateDoc(userRef, newData);
      console.log("newData: ", newData);
      console.log("userSnap in EditView: ", userSnap.data());
      return true;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Reference error: ", error);
  }
}

/**
 * 
 * @param {String} email 
 */
export async function validateUser(email){

}