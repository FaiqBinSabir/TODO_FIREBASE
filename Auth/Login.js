
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

import { GoogleAuthProvider,signInWithPopup } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJjW_hDCel2QZxmMeGkuhze0-cS5icgNg",
  authDomain: "firstproject-55db5.firebaseapp.com",
  projectId: "firstproject-55db5",
  storageBucket: "firstproject-55db5.appspot.com",
  messagingSenderId: "333610480639",
  appId: "1:333610480639:web:d33cbfb2603442f2c56dca",
  measurementId: "G-BM9QD48RPZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const email=document.getElementById('loginemail')
const password=document.getElementById('loginpassword')
const loginBtn=document.getElementById('loginbtn')
const createUser=(auth,email,password)=>{
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 

    const user = userCredential.user;
    swal({
      title: "Welcome Back!",
      text: "Login sucessful!",
      icon: "success",
    }).then(() => {

    location.href = "../Todo/Task.html"})
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    swal({
      title: "Failure!",
      text: ` ${errorMessage} `,
      icon: "error",
    });
    console.log("",errorMessage)
  });
    

}

loginBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  createUser(auth,email.value,password.value)
  
})


// goolge login

const provider = new GoogleAuthProvider();

googlelogin.addEventListener("click",(event)=>{



  event.preventDefault();
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    swal({
      title: "Welcome Back!",
      text: "Login sucessful!",
      icon: "success",
    }).then(() => {

    location.href="../Todo/Task.html";  });
  
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    swal({
      title: "Failure!",
      text: errorMessage,
      icon: "error",
    });
    // ...
  });
  
})


