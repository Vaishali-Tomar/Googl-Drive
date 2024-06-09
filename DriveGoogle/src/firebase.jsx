import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCsbVT7Cq-eM1Rnqlia0MR2l0DqsffqrBE",
  authDomain: "drive-yt-pwd.firebaseapp.com",
  projectId: "drive-yt-pwd",
  storageBucket: "drive-yt-pwd.appspot.com",
  messagingSenderId: "754159444426",
  appId: "1:754159444426:web:eb762ea0f492c92d7aef33",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, storage, auth, provider };
