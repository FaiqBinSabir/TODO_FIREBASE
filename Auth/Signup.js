


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

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

const email=document.getElementById('signupemail')
const password=document.getElementById('signuppassword')
const loginBtn=document.getElementById('newid')

const createUser=(auth,email,password)=>{

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log("user==>",user);
      swal({
        title: "Welcome!",
        text: "Account created!",
        icon: "success",
      }).then(() => {

      location.href="./Login.html";  });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      swal({
        title: "Failure!",
        text: "Incorrect credientials!",
        icon: "error",
      });
      console.log("error=>",errorMessage);
      // ..
    });


}
loginBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  createUser(auth,email.value,password.value)
  
})






// google login 

