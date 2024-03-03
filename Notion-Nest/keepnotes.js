const addNotes=document.getElementById("addnote")
const updateLStorage=()=>{
    const textAreaData=document.querySelectorAll('textarea');
   const notes=[];
   textAreaData.forEach((curnote)=>{
    // console.log(curnote.value);
      return notes.push(curnote.value)
   })
   //    console.log(notes);
localStorage.setItem("notes",JSON.stringify(notes));


   // settting the tittle of the note
   const titleTextArea = document.querySelectorAll('#tittle');
   const tittle = [];
   titleTextArea.forEach((curtittle) => {
    //  console.log(curtittle.value);
     return tittle.push(curtittle.value);
   });
   
   localStorage.setItem("tittle", JSON.stringify(tittle));
   


  //  
  // ${tittle?"hidden":""}
}
const addNewNotes= (text='',tittle='')=>{
     const note=document.createElement('div');
    note.classList.add('note');
    const htmlData=` <div class="inner-note">
    <input type="text" placeholder="Tittle.." id="tittle" class="${tittle?"hidden":""}" >
    <div class="show-tittle ${tittle?"":"hidden "} "></div>
    </div>
    <div class="main ${text?" ":"hidden"}"></div>
    <textarea class="main-text ${text?"hidden":" "}" placeholder="Take a note.."></textarea>
    <div class="operation">
    <div class="date"> ${new Date().toLocaleString()}</div>
    <i class="fas fa-edit edit"></i>
      <i class=" fas fa-trash-alt  dlte"></i>
    </div>
      `
      note.insertAdjacentHTML("afterbegin",htmlData);
     //  console.log(note);  
 
//  console.log(text);
     const editBtn=note.querySelector('.edit');
     const dlteBtn=note.querySelector('.dlte');
     const mainDiv=note.querySelector('.main');
     const textArea = note.querySelector('textarea');
     const input_tittle = note.querySelector('#tittle');
     const show_tittle = note.querySelector(".show-tittle");
     dlteBtn.addEventListener("click",()=>{
       const ans=confirm("are you sure you want to delete?")
        if(ans){
          note.remove(); 
          updateLStorage();
        }
      })
      //showing the data on the main div
       textArea.value=text;
       mainDiv.innerHTML=text;
       textArea.addEventListener("change",(event)=>{
        const value=event.target.value;
     //    console.log(value);
        mainDiv.innerHTML=value;
        updateLStorage();
    })
    //  showing the data on the div with class show-tittle
     input_tittle.value = tittle;
    show_tittle.innerHTML = tittle;

    input_tittle.addEventListener("change", (event) => {
    const value = event.target.value;
    show_tittle.innerHTML = value;
    updateLStorage();
     });




     // toggle the edit button
       editBtn.addEventListener("click",()=>{
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
        show_tittle.classList.toggle('hidden');
        input_tittle.classList.toggle('hidden');

       })

     
      const section = document.querySelector('section');
      section.appendChild(note);



     // adding background


     async function getRandomImage() {
      const apiKey = 'wNi8I5WJvuJRUurvqtdnnn80saJj5X9QaiAgI_jw9Do'
      const apiUrl = `https://api.unsplash.com/search/collections?page=1&query=white&client_id=${apiKey}`;
    
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const imageUrl = data.results[Math.floor(Math.random()*10)].cover_photo.urls.small;
        // console.log(imageUrl);
        return imageUrl;
      } catch (error) {
        console.error('Error fetching random image:', error);
        // Return a default image URL in case of an error
        return 'https://via.placeholder.com/800x600';
      }
    }
    

   async function gettingtheurl(){
    const imageURL=await getRandomImage();
    // console.log(imageURL);
    mainDiv.style.backgroundImage = `url('${imageURL})`;
    mainDiv.style.backdropFilter='blur(50px)'
   }
   gettingtheurl();





  }

  //getting the data from the localstorage
  const notes=JSON.parse(localStorage.getItem('notes'));
  const storedTittles = JSON.parse(localStorage.getItem('tittle'));
  // ...
  if (notes || storedTittles) {
    notes.forEach((note, index) => addNewNotes(note, storedTittles[index]));
  }

addNotes.addEventListener("click",()=>addNewNotes());










/// my updates ///////////////////////////

const blockDiv = document.querySelectorAll("._block");
const noteView = document.querySelector(".header__notes-view");

noteView.addEventListener("click", () => {
  let hasHiddenDiv = true;

  blockDiv.forEach(hideDiv => {
    hideDiv.classList.toggle('_block');
    hideDiv.classList.toggle('hidden_div');
    if (hideDiv.classList.contains('hidden_div')) {
      hasHiddenDiv = false;
    }
  });

  const section = document.querySelector('section');
  const notes = document.querySelectorAll('.note');
  const main = document.querySelectorAll('.main');
  const operation = document.querySelectorAll('.operation');
  const mainText = document.querySelectorAll('.main-text');

  if (hasHiddenDiv) {
    section.style.flexDirection = "row";
    section.style.flexWrap="wrap";
    notes.forEach(note => {
      // if (note) {
      //   note.style.width = "30vw";
      // }
    });
    operation.style.width = "30vw";
    mainText.style.width = "30vw";
  } else {
    // Revert to default styles
    section.style.flexDirection = "column";
    section.style.flexWrap="wrap";
    notes.forEach(note => {
      note.style.width = ""; // Reset to default
    });
    operation.style.width = ""; // Reset to default
    mainText.style.width = ""; // Reset to default
  }
});


// managing dark and light theme

const light = document.getElementById('light');
light.addEventListener("click", () => {
  const body=document.querySelector('body')
  // const show_tittle=document.querySelectorAll('.show-tittle');
  const right_nav=document.querySelector('#right-nav');
  const header=document.querySelector('.header');
  const da=light.classList.toggle('fa-toggle-on');
  const li=light.classList.toggle('fa-toggle-off');
  if(da){
    body.style.backgroundImage='url("darknote4.jpeg")'
      body.style.color='black';
     body.style.transition='2s';
     body.style.backgroundColor='rgb(222,179,131)'
     right_nav.classList.remove('right-nav-color-light');
     right_nav.classList.add('right-nav-color-dark');
    }
    else{
      body.style.backgroundImage='url("lightnote.jpeg")'
      body.style.color='black';
      body.style.transition='2s ease-out';
      body.style.backgroundColor="#f7f1f1";
      right_nav.classList.remove('right-nav-color-dark');
      right_nav.classList.add('right-nav-color-light');
  }

  });

const header_name=document.querySelector('.header-name')
 window.addEventListener('scroll',()=>{
  if(window.scrollY>600){
    header_name.style.display='block';
  }
  else
  header_name.style.display='none';
 })

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

let USerSignOut=()=>{
  sessionStorage.removeItem("user-creds");
  sessionStorage.removeItem('user-info');
  sessionStorage.clear();
  signOut(auth).then(()=>{
   const ans=confirm("are you sure want to signout?")
    if(ans)
    window.location.href='form.html';
  }).catch(error=>console.log(error.message));
}
const sign_out=document.getElementById('sign-out');
sign_out.addEventListener("click",USerSignOut);

  

//implementting the search functionality 

const nav_search_input=document.getElementById('nav-search-input');
const nav_search_icon=document.getElementById('nav-search-icon');
const header_search_input=document.getElementById('header-search-input');
const header_search_icon=document.getElementById('header-search-icon');
const section=document.querySelector('section');


const my_tittle=JSON.parse(localStorage.getItem('tittle'))
console.log(my_tittle);
function showPopup(message){
 const popUp=document.createElement('div')
 popUp.classList.add('pop-Up')
 popUp.innerHTML=message;
  section.appendChild(popUp);
}
const getUserData = () => {
  const inputValue = nav_search_input.value.trim().toLowerCase(); 
  const inputValueheader = header_search_input.value.trim().toLowerCase(); 
  console.log("asdsd",inputValueheader)
  const notes = document.querySelectorAll('.note');
  let matchFound=false;
  notes.forEach((note) => {
    const show_tittle = note.querySelector('.show-tittle');
    const tittleText = show_tittle.innerText.trim().toLowerCase();
    if (tittleText.includes(inputValueheader)&&tittleText.includes(inputValue)) {
      matchFound=true;
      note.style.display = 'block';
      console.log("matchfound",tittleText)
    } else {
      note.style.display = 'none';
      console.log("matchnot found",tittleText)
    }
  }); 
  if(!matchFound){
    showPopup("No matching result found☹️");
    setTimeout(()=>{
      window.location.href='notesmain.html';
    },4000)
  }
}
nav_search_icon.addEventListener('click',()=>{
  getUserData();
});
nav_search_input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    getUserData();
  }
});
header_search_icon.addEventListener('click',()=>{
  getUserData();
});
header_search_input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    getUserData();
  }
});