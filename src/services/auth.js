import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
//Auth instance
import { auth } from "./firebase";

const USER_NOT_AUTH = {
  id: null,
  email: null,
};

let authUser = USER_NOT_AUTH;

let watchers = [];

onAuthStateChanged(auth, (user) => {
  if (user) {
    authUser = {
      id: user.uid,
      email: user.email,
    };
  } else {
    authUser = USER_NOT_AUTH;
  }

  stateUpdateAll();
  console.log('Auth state changed: ', authUser);
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
export async function subscribeToAuth(suscription) {
  watchers.push(suscription);
  console.log(watchers);
  await stateUpdate(suscription);
}

//State Updaters

/**
 * Recieves a callback function with a User object as a parameter.
 * @param {(user: import("firebase/auth").User)=>{}} updater
 */
async function stateUpdate(updater) {
  updater({ ...authUser });
}

/**
 * Updates state of user Auth for al suscribers.
 */
function stateUpdateAll() {
  watchers.forEach((updater) => {
    console.log("watchers: ", updater);
    stateUpdate(updater);
  });
}
