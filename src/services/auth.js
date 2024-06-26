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

if (localStorage.getItem("user") !== null) {
  authUser = JSON.parse(localStorage.getItem("user"));
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    setAuthUser({
      id: user.uid,
      email: user.email,
      username: user.displayName,
      avatar: user.photoURL,
    });
  } else {
    setAuthUser(USER_NOT_AUTH);
  }
  // console.log("Auth state: ", authUser);
});

/**
 * Creates a new User and sets it into the data base.
 * @param {String} email
 * @param {String} password
 * @returns {Promise<Boolean>}
 */
export async function register(email, password) {
  let success = Boolean;
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const username = email.split("@")[0];
    const avatar = apiUrl.multiAvatar + username + ".svg";
    await updateProfile(userCredentials.user, {
      displayName: username,
      photoURL: avatar,
    });
    authUser.username = username;
    authUser.avatar = avatar;
    success = await setUser(authUser);
    if (!success) {
      throw new Error("User could not be registered");
    }
    return success;
  } catch (error) {
    console.error("Error: user could not be registered", error.code);
    throw error;
  }
}

/**
 * Signs in a user. Recieves email and passwords credentials.
 * @param {String} email
 * @param {String} password
 */
export async function login(email, password) {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // console.log("Logged User: ", userCredentials.user);
    return true;
  } catch (error) {
    console.log("Could not log with provided mail or password: ", error);
    throw error;
  }
}
/**
 * Logs out an authenticated user.
 * @returns {Promise<void>}
 */
export async function logout() {
  localStorage.removeItem("user");
  return await signOut(auth);
}

//Suscription to Auth state
/**
 * Creates a suscription (callback) to Auth state of user.
 * @param {(Promise<Object>)=>{}}
 */
export async function subscribeToAuth(suscription) {
  try {
    watchers.push(suscription);
    // console.log("watchers: ", watchers);
    await stateUpdate(suscription);
    return () => {
      watchers = watchers.filter((w) => w !== suscription);
    };
  } catch (error) {
    console.error("Error in suscribeToAuth: ", error);
  }
}

//State Updaters

/**
 * Recieves a callback. Updates
 * @param {(Promise<Object>)=>{}} updater
 */
async function stateUpdate(updater) {
  await updater({ ...authUser });
}

/**
 * Updates state of user Auth for al suscribers.
 */
async function stateUpdateAll() {
  watchers.forEach(async (updater) => {
    await stateUpdate(updater);
  });
}

/**
 * Sets new authenticated data. Updates data to suscribers.
 * @param {Object} newAuthUser
 */
async function setAuthUser(newAuthUser) {
  authUser = {
    ...newAuthUser,
  };
  localStorage.setItem("user", JSON.stringify(authUser));
  await stateUpdateAll();
}
