const login_btn = document.querySelector('.login-btn')
const registration_btn = document.querySelector('.registration-btn')
const login_div=document.querySelector('.login')
const registration_div=document.querySelector('.registration');
registration_btn.addEventListener("click", () => {
    // console.log("click")
    login_div.classList.toggle('__hidden');
    registration_div.classList.toggle('__hidden');
    // console.log("Login class:", login_div.classList);
    // console.log("Registration class:", registration_btn.classList)
});
login_btn.addEventListener("click",()=>{
    // console.log("click");
    login_div.classList.toggle('__hidden');
    registration_div.classList.toggle('__hidden');
})
const heading=document.querySelector('.heading');
heading.addEventListener("click",()=>{
    console.log("click occur")
   window.location.href='main.html';
})


// adding the functionality of show and hide of password
//   for the register
const password_register=document.getElementById('password-register');
const toggle_register_password=document.getElementById('toggle-register-password');
toggle_register_password.addEventListener('click',()=>{
    const type = password_register.type === 'password' ? 'text' : 'password';
    password_register.type = type;
    toggle_register_password.classList.toggle('fa-eye');
    toggle_register_password.classList.toggle('fa-eye-slash');
})
// for the signin
const password_signin=document.getElementById('password-signin')
const toggle_signin_password=document.getElementById('toggle-sigin-password')
toggle_signin_password.addEventListener('click',()=>{
    const type=password_signin.type==='password'?'text':'password';
    password_signin.type=type;
    toggle_signin_password.classList.toggle('fa-eye');
    toggle_signin_password.classList.toggle('fa-eye-slash');
})