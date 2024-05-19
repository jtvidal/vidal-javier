//Aquí estarán las funciones que manejaran la info del usuario
//autenticado, en la base de datos.
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
let userAuth = {
  id: null,
  email: null,
  username: null,
};
const dbUser = {
  credentials: {},
  avatar: null,
  first: null,
  last: null,
  description: null,
};

export async function setUser(userData) {
  if (userData.id !== null) {
    const userRef = doc(db, "users", userData.id);
    userAuth = userData;
    dbUser.credentials = { ...userAuth };
    await setDoc(userRef, dbUser);
  }
}

export function getUserById() {}

export function editUserById() {}

export function getUserByUsername() {}
