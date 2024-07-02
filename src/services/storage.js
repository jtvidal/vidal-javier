import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

/**
 *
 * @param {String} path
 * @param {File} file
 */
export async function uploadFile(path, file) {
  const fileRef = ref(storage, path);
  return uploadBytes(fileRef, file);
}

/**
 * Get absolute route to the storage file
 * @param {string} path
 * @returns
 */
export async function getFile(path) {
  const fileRef = ref(storage, path);
  return await getDownloadURL(fileRef);
}
