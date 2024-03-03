import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase,set ,ref,get,child } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';
import {inMemoryPersistence,getAuth,GoogleAuthProvider,browserSessionPersistence,browserLocalPersistence,setPersistence,signInWithPopup,signOut,onAuthStateChanged,createUserWithEmailAndPassword,
signInWithEmailAndPassword }
 from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyAzPoe7OxfJFOGTPvLwliWNDeJXSKswQ8A",
    authDomain: "notion-nest.firebaseapp.com",
    projectId: "notion-nest",
    storageBucket: "notion-nest.appspot.com",
    messagingSenderId: "1047073749057",
    appId: "1:1047073749057:web:daa953c843711567d56ec0"
  };


  const app = initializeApp(firebaseConfig);
  const db=getDatabase();
  const auth=getAuth(app);
  const dbref=ref(db);
  let  name_register=document.getElementById('name-register');
  let  email_register=document.getElementById('email-register');
  let  password_register=document.getElementById('password-register');
//   let  register_btn=document.getElementById('register-btn');
  let main_form_register=document.getElementById('main-form-register');

//registering users
  let RegisterUser=event=>{
    event.preventDefault();
    createUserWithEmailAndPassword(auth,email_register.value,password_register.value)
    .then((credintials=>{
        // console.log(credintials.user.uid);
        //setting the name;
        set(ref(db,'UserAuthList/'+credintials.user.uid),{
            name:name_register.value,
        })
        .then(()=>{alert("Registered successfully!!")})
    })).catch(error=>{
        console.log(error.message);
        alert(error.message)
        console.log(error.code);
    })
}
  main_form_register.addEventListener("submit",RegisterUser);
  

  // login the users


   let email_signin=document.getElementById('email-signin');
   let password_signin=document.getElementById('password-signin');
//    let signin_btn=document.getElementById('signin-btn');
   let main_form_signin=document.getElementById('main-form-signin');

   
   let signInUser = event => {
    event.preventDefault();
    setPersistence(auth,browserSessionPersistence).then(()=>{
      return signInWithEmailAndPassword(auth, email_signin.value, password_signin.value)
      .then(credintials => {
        get(child(dbref, 'UserAuthList/'+credintials.user.uid)).then((snapshot) => {
            // console.log(snapshot.val());
            if (snapshot.exists()) {
                sessionStorage.setItem("user-info", JSON.stringify({ name: snapshot.val().name }));
                sessionStorage.setItem("user-creds", JSON.stringify(credintials.user));
                window.location.href = "notesmain.html";
            } else {
                window.location.href='form.html';
            }
        });
        console.log(credintials);
       
  
    })
    .catch(error => {
        console.log(error.message);
        console.log(error.code);
        alert(error.code);
    });
     })
}
main_form_signin.addEventListener("submit", signInUser);

//   login with google

const handleUserState=(user)=>{
  if(user){
    window.location.href="notesmain.html";
    unsubscribe();
    console.log("user present");
    }
    else
    window.location.href="form.html";
    console.log("user-not-present") 
}
const unsubscribe = onAuthStateChanged(auth, (user) => {
  // Check if the user logged in using Google
  if (user && user.providerData.some(provider => provider.providerId === 'google.com')) {
      handleUserState(user);
  }
});
const signInWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    setPersistence(auth, inMemoryPersistence)
      .then(() => {
        return signInWithPopup(auth, provider)
          .then((result) => {
            const user=result.user;
            const displayName=user.displayName;
            console.log(displayName);
            const email=user.email;
            const photoURL=user.photoURL;
            console.log(photoURL);
            // handleUserState(user);
            sessionStorage.setItem("displayName",JSON.stringify(displayName));
            sessionStorage.setItem("email",JSON.stringify(email));
            sessionStorage.setItem("photoURL",JSON.stringify(photoURL));
          })
          .catch((error) => {
           console.log(error.message);
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

const google_signin_btn=document.getElementById('google-signin-btn');
google_signin_btn.addEventListener("click",signInWithGoogle);

// let USerSignOut=()=>{
//     sessionStorage.removeItem("user-creds");
//     sessionStorage.removeItem('user-info');
//     sessionStorage.clear();
//     signOut(auth).then(()=>{
//      const ans=confirm("are you sure want to signout?")
//       if(ans)
//       window.location.href='form.html';
//     }).catch(error=>console.log(error.message));
//   }

//   const sign_out=document.getElementById('sign-out')
//   if(sign_out)
// sign_out.addEventListener("click",USerSignOut);