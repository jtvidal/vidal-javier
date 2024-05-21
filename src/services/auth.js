import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
//Auth instance
import { auth } from "./firebase";
import { setUser, apiUrl } from "./user";

const USER_NOT_AUTH = {
  id: null,
  email: null,
  username: null,
  avatar: null,
};

let authUser = { ...USER_NOT_AUTH };

let watchers = [];

onAuthStateChanged(auth, (user) => {
  if (user) {
    authUser = {
      id: user.uid,
      email: user.email,
      username: user.displayName,
      avatar: user.photoURL,
    };
  } else {
    authUser = USER_NOT_AUTH;
  }

  stateUpdateAll();
  console.log("Auth state changed: ", authUser);
});

/**
 * Register a new user in the db.
 * @param {String} email
 * @param {String} password
 * @returns {Promise<void>}
 */
export async function register(email, password) {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const username = email.split("@")[0];
    const avatar = apiUrl.multiAvatar + username + '.svg';
    await updateProfile(userCredentials.user, {
      displayName: username,
      photoURL: avatar,
    });
    authUser.username = username;
    authUser.avatar = avatar;
    setUser(authUser);
  } catch (error) {
    console.error("Error: user could not be registered", error);
  }
}

export async function login(email, password) {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Logged User: ", userCredentials.user);
  } catch (error) {
    console.log("Could not log with provided mail or password: ", error);
  }
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
  // console.log("watchers: ", watchers);
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
    stateUpdate(updater);
  });
}
