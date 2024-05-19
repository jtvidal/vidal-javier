//Aquí estarán las funciones que manejaran la info del usuario
//autenticado, en la base de datos.
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
let userAuth = {
  id: null,
  email: null,
  username: null,
};
export const dbUser = {
  credentials: {},
  avatar: null,
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
