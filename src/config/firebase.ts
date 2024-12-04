// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc5cNPz8KcBphLoUGoY_SPR5HJkrX6soM",
  authDomain: "hogent-parkings-2bdc5.firebaseapp.com",
  projectId: "hogent-parkings-2bdc5",
  storageBucket: "hogent-parkings-2bdc5.firebasestorage.app",
  messagingSenderId: "861286251205",
  appId: "1:861286251205:web:fcaa2a3751fbbd2b1f0eac"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeAuth(app, { 
    persistence: getReactNativePersistence(AsyncStorage)
})

export const auth = getAuth(app);



