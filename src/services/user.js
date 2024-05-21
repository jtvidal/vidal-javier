//Aquí estarán las funciones que manejaran la info del usuario
//autenticado, en la base de datos.
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
let userAuth = {
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
 * @param {import("firebase/auth").User} userData
 */
export async function setUser(userData) {
  if (userData.id !== null) {
    const userRef = doc(db, "users", userData.id);
    userAuth = userData;
    dbUser.credentials = { ...userAuth };
    await setDoc(userRef, dbUser);
  }
}

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
    console.error("Error: ", error);
  }
}

export function editUserById() {}

export function getUserByUsername() {}
