
//Import Firebase (MODULE)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, getDocs } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

//Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyC1kwkT_OvnmVUY3YE4U8KyI4vlGSf2-_g",
    authDomain: "surgical-robo-auth-2.firebaseapp.com",
    projectId: "surgical-robo-auth-2",
    storageBucket: "surgical-robo-auth-2.firebasestorage.app",
    messagingSenderId: "786965145676",
    appId: "1:786965145676:web:75d617cc4fcdd53abe2ce9"
  };

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//Email link settings
const actionCodeSettings = {
  url: "https://DoMoreTech.github.io/Surgical_Robot/",
  handleCodeInApp: true
};

//Send Email Link
window.sendLink = async function () {
  const email = document.getElementById("email").value;
  const errorMsg = document.getElementById("error-msg");

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  //Empty check
  if (email === "") {sssss
    errorMsg.style.display = "block";
    errorMsg.innerText = "Email is required!";
    return;
  }

  //Invalid email
  if (!email.match(emailPattern)) {
    errorMsg.style.display = "block";
    errorMsg.innerText = "Enter a valid email!";
    return;
  }

  errorMsg.style.display = "none";

  //Check if email is authorized
const querySnapshot = await getDocs(collection(db, "authorized_users"));

let isAuthorized = false;

querySnapshot.forEach((doc) => {
  if (doc.data().email === email) {
    isAuthorized = true;
  }
});

//If not authorized → stop
if (!isAuthorized) {
  errorMsg.style.display = "block";
  errorMsg.innerText = "You are not authorized to access this application.";
  return;
}

  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      alert("Email sent!");
      localStorage.setItem("emailForSignIn", email);
    })
    .catch((error) => {
      alert(error.message);
    });
};

//Handle Login After Clicking Email Link
if (isSignInWithEmailLink(auth, window.location.href)) {
  let email = localStorage.getItem("emailForSignIn");

  if (!email) {
    email = prompt("Please enter your email again");
  }

  signInWithEmailLink(auth, email, window.location.href)
    .then(() => {
  localStorage.removeItem("emailForSignIn");

  //Redirect to next page
  alert("Login Successful!");
  localStorage.setItem("isLoggedIn", "true");
  window.location.href = "surgicalrobo.html";
})
    .catch((error) => {
      alert(error.message);
    });
}