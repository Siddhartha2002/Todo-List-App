import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDbbadb7A0nsycAuR-sD2f6XaDTMe7FxdM",
    authDomain: "todo-app-7b2c4.firebaseapp.com",
    projectId: "todo-app-7b2c4",
    storageBucket: "todo-app-7b2c4.appspot.com",
    messagingSenderId: "360023479293",
    appId: "1:360023479293:web:9cec283caa4dbe38483f94",
    measurementId: "G-5N1D61LFDW"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();

  export default db;