
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore, doc, updateDoc, collection, addDoc, query,deleteDoc, where, getDocs, limit } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

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

const db = getFirestore(app);
let limitdata = null;
let skipdata = null;
let userdata = null;


const getVal = async (limits) => {

  console.log(limits);
  const q = query(collection(db, "todos"), where("userid", "==", userdata), limit(limits));
  const v = query(collection(db, "todos"), where("userid", "==", userdata));
  console.log(v);
  const querySnapshot = await getDocs(q);
  const querySd = await getDocs(v);

  let totaltodo = 0;
  let completed = 0;
  querySd.forEach((doc) => {
totaltodo++;

if (doc.data().status === "complete") {
  
completed++;
}
    
  })
  console.log("completed",completed);
  console.log(totaltodo);
  let totaltaskss = document.getElementById("totaltasks")
  totaltaskss.innerHTML = totaltodo;
  let d = document.getElementById("primarytask")
  d.innerText = completed;

  document.getElementById('listcontainer').style.display = "none";
var numb = 0;
  querySnapshot.forEach((doc) => {

  
numb++;

    var newItem = document.createElement("li");
    var textNode = document.createTextNode(doc.data().todoTask);
    // console.log( "todo id =>" ,doc.id);
    // var todoid = document.createTextNode(doc.id);
    // var spans =  document.createElement("span")
    // spans.innerText = JSON.stringify(todoid)
    //spans.style.display = "block";

    newItem.appendChild(textNode);
    document.getElementById("listcontainer").appendChild(newItem);

    let span = document.createElement("span");
    let span1 = document.createElement("button");
span1.className = "btn"
    span.innerHTML = "\u2026";
   span1.innerHTML = "\u00d7";
    newItem.appendChild(span);
    newItem.appendChild(span1);
    newItem.id = doc.id


    if (doc.data().status == "complete") {
      newItem.classList = "checked"
    }


  });


  document.getElementById('listcontainer').style.display = "block";
};
viewtodo.addEventListener("click",()=>{

  location.reload();
  getVal(5);
})



const ListContainerr = document.getElementById('listcontainer');


ListContainerr.addEventListener("click", async function (e) {


  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");

     let id = e.target.id;
    console.log(id);

    const docRef = doc(db, "todos", id);

    await updateDoc(docRef, {
      status: "complete"
    });

  }
  else if (e.target.tagName === "SPAN") {

   let idd =  e.target.parentNode.id;
   e.target.parentNode.classList.remove("checked");
    const docRef = doc(db, "todos", idd);

    await updateDoc(docRef, {
      status: "incomplete"
    });

  }
  else if (e.target.tagName === "BUTTON"){

    let data=  e.target.parentNode.id;

    


      await deleteDoc(doc(db, "todos", data));
      console.log("deleted");
     
  
      
        
      }
    });
      
      
      
      
  

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    userdata = uid;
    //console.log("uid=>", uid);

    // getVal(5);

    // ...
  } else {
    // User is signed out
    // ...
  }
});
 setTimeout(() => {
  getVal(5);
}, 1000);
let additem = document.getElementById("additem");

additem.addEventListener("click", async () => {

  let todotask = document.getElementById("todoitem").value;

  console.log(todotask);
  console.log(userdata);

  if (todotask != "") {

    try {
      const docRef = await addDoc(collection(db, "todos"), {
        todoTask: todotask,
        userid: userdata,
        status: "incomplete",

      }).then( async () => {

        

          location.reload();
        }
      );

      console.log("Document written with ID: ", docRef.id);
      document.getElementById('loader').style.display = 'block'




    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


})


// pagination concept

page1.addEventListener("click", () => {


  limitdata = 5;
  skipdata = 0;
  getVal(limitdata);



})
page2.addEventListener("click", () => {


  limitdata = 5;
  getVal(limitdata);



})























// logout code 

Logout.addEventListener("click", () => {

  signOut(auth).then(() => {
    swal({
      title: "Thanks",
      text: "Logged out sucessfully!",
      icon: "success",
    }).then(() => {

      location.href = "../Auth/Login.html"
    })



    // Sign-out successful.
  }).catch((error) => {
    // An error happened.

    swal({
      title: "error",
      text: "error occoured!",
      icon: "failure",
    })
  });
})


//  practice code 
