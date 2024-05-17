import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
//Own service
import { auth } from "./firebase";
import { watch } from "vue";

const USER_NOT_AUTH = {
  id: null,
  email: null,
};

let authUser = USER_NOT_AUTH;

let watchers = [];

onAuthStateChanged(auth, (user) => {
  if (user) {
    authUser.id = user.uid;
    authUser.email = user.email;
  } else {
    authUser = USER_NOT_AUTH;
  }

  stateUpdateAll();
});

/**
 * Register a new user. Logs it's credentials.
 * @param {String} email
 * @param {String} password
 * @returns {Promise<void>}
 */
export async function register(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredentials) => {
      console.log("ID de usuario: ", userCredentials.user.uid);
    })
    .catch((error) => {
      console.log("Error: user could not be registered", error);
    });
}

export async function login(email, password) {
  return await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredentials) => {
      console.log("Logged user's ID: ", userCredentials.user.uid);
    })
    .catch((error) => {
      console.log("Could not log with provided mail or password", error);
    });
}
/**
 * Logs out an authenticated user.
 * @returns {Promise<void>}
 */
export function logout() {
  return signOut(auth);
}

//Suscription to Auth state
/**
 * Creates a suscription to Auth state of user.
 * @param {(user:import("firebase/auth").User)=>{}} suscription
 */
export function subscribeToAuth(suscription) {
  watchers.push(suscription);
  stateUpdate(suscription);
}

//Notifiers

/**
 * Recieves a callback function with a User object as a parameter
 * @param {(user: import("firebase/auth").User)=>{}} updater
 */
function stateUpdate(updater) {
  updater({ ...authUser });
}

/**
 * Updates state of user Auth for al suscribers.
 */
function stateUpdateAll() {
  watchers.forEach((updater) => {
    stateUpdate(updater);
  });
}
