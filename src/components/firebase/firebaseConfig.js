// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcGG7M1mWwp_WYv09ljOIC2OI9ESvyAck",
  authDomain: "talksy-8c315.firebaseapp.com",
  databaseURL: "https://talksy-8c315-default-rtdb.firebaseio.com",
  projectId: "talksy-8c315",
  storageBucket: "talksy-8c315.firebasestorage.app",
  messagingSenderId: "267519120017",
  appId: "1:267519120017:web:b79bd8feb5dd547f6d2530"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
// export {app};
export default firebaseConfig