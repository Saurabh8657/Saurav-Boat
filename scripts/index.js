////login start
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
/////login end

let navbarSigninBtn = document.querySelector(".navbar-signin-btn") ;
navbarSigninBtn.addEventListener("click", ()=>{
    let overlay = document.querySelector(".overlay-for-login") ;
    overlay.classList.add("show-overlay-for-login") ;

    let loginForm = document.querySelector(".login-container") ;
    loginForm.classList.add("show-login-form") ;

    console.log("clicked");
    document.querySelector(".search-result-content").classList.add("red");
})

