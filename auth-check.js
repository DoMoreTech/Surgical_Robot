import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1kwkT_OvnmVUY3YE4U8KyI4vlGSf2-_g",
  authDomain: "surgical-robo-auth-2.firebaseapp.com",
  projectId: "surgical-robo-auth-2",
  storageBucket: "surgical-robo-auth-2.firebasestorage.app",
  messagingSenderId: "786965145676",
  appId: "1:786965145676:web:75d617cc4fcdd53abe2ce9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//Get custom session flag
const isLoggedIn = localStorage.getItem("isLoggedIn");

//Check login status
onAuthStateChanged(auth, (user) => {

  if (user && isLoggedIn === "true") {
    //Allow access
    document.body.style.display = "block";

    //Remove flag after first use
    localStorage.removeItem("isLoggedIn");

  } else {
    //Block access
    document.body.innerHTML = "<h2 style='text-align:center;margin-top:20%;'>Unauthorized Access ❌</h2>";
  }

});