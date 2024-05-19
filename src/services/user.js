//Aquí estarán las funciones que manejaran la info del usuario
//autenticado, en la base de datos.
import { addDoc, collection, setDoc } from "firebase/firestore";
import { db } from "./firebase";
let userAuth = {
  id: null,
  email: null,
  username: null,
};
export let dbUser = {
  credentials: {},
  avatar: null,
  first: null,
  last: null,
  description: null,
};

const userCollectionRef = collection(db, "users");

export function setUser(userData) {
  if (userData.id !== null) {
    console.log("set data: ", userData);
    userAuth = userData;
    dbUser.credentials = { ...userAuth};
    console.log("credentials: ", dbUser.credentials);
  }
}

export function getUserById() {}

export function editUserById() {}

export function getUserByUsername() {}
