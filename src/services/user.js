import { doc, getDoc, setDoc } from "firebase/firestore";
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
    } else {
      throw new Error("User could not be registered, user.uid === null");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * Gets user by id from db.
 * @param {String} id
 * @returns {(Promise<Object>)} User Object
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

// TODO: replace user data with new data changed in EditProfile
// export function editUserById() {}
