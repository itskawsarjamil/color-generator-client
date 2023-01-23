import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export default app;

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDvcKIwXtN1uAIcbfrbUJm3PJMv247KBxo",
//   authDomain: "color-generator-2f96a.firebaseapp.com",
//   projectId: "color-generator-2f96a",
//   storageBucket: "color-generator-2f96a.appspot.com",
//   messagingSenderId: "486781628118",
//   appId: "1:486781628118:web:5b6541c33ecbf70b23e377"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export default app;






