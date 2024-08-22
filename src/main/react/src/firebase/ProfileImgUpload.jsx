import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const profileImgConfig = {
  apiKey: "AIzaSyDmnWzHF5HMUSzkySARzzbjw1yynoY8djg",
  authDomain: "creditonly-304f8.firebaseapp.com",
  projectId: "creditonly-304f8",
  storageBucket: "creditonly-304f8.appspot.com",
  messagingSenderId: "700743894697",
  appId: "1:700743894697:web:fed28c51b98f9332ec0bb8",
  measurementId: "G-SK32N1GK56",
};
const profileImgapp = initializeApp(profileImgConfig, "creditonly");
const profileStorage = getStorage(profileImgapp);

export {
  profileImgapp,
  profileStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
};
