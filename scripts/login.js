//------------------ login modal   --------------//
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
//------------------ login modal   --------------//

let baseURL = "https://boat-mock-server.onrender.com" ;
let userURL = `${baseURL}/users`;

let usersList;

async function fetchUsers() {
  try {
    let res = await fetch(`${userURL}`);
    let data = await res.json();
    console.log(data);
    usersList = data;
  } catch (error) {
    console.log(error);
  }
}
fetchUsers() ;


/// Login
let loginemailInput = document.getElementById("login-email");
let loginpasswordInput = document.getElementById("login-password");
let siginBtn = document.getElementById("loginbtnSign");


siginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("hi");
  if (checkUsers(usersList)) {
    fetchCartOfLoggedInUser();
    toastIntoAction("Login Successful", "success");
    setTimeout(() => {
      window.location.href = "index.html";
    },2000)
   
  } else {
    toastIntoAction("User doesnot exist or Invalid Credentials", "alert");
  }
});
function checkUsers(usersList) {
  let obj = {
    email: loginemailInput.value,
    password: loginpasswordInput.value,
  };
  for (let i = 0; i < usersList.length; i++) {
    if (
      usersList[i].email == obj.email  &&
      usersList[i].password == obj.password
    ) {
      putUsersIntoLocal(usersList[i]);
      return true;
    }
  }
  return false;
}

function putUsersIntoLocal(user) {
  localStorage.setItem("user", JSON.stringify(user));
}
async function fetchCartOfLoggedInUser() {
  let loggedInUser = JSON.parse(localStorage.getItem("user"));
  try {
      let res = await fetch(`${baseURL}/carts`);
      let data = await res.json();
      console.log("Carts",data);
      for (const cart of data) {
          if (cart.userId === loggedInUser.id) {
              localStorage.setItem("cart", JSON.stringify(cart));
              break;
          }
      }
  } catch(error) {
      console.log(error);
  }
}

/// Toast
let toast = document.querySelector(".toast");
let toastText = document.querySelector(".toast-text");
let toastClose = document.querySelector(".toast-close");

function toastIntoAction(params, type){
  toastText.innerText = params;
  //  toast.classList.remove("hidden");
  toast.className = "";
  toast.classList.add(`${type}`, "toast");
  toastClose.addEventListener("click", ()=>{
     toast.classList.add("hiddentoast");
  })
  setTimeout(()=>{
      toast.classList.add("hiddentoast");
  },4000)
}


//Signup
let signupNameInput = document.querySelector(".name-signup");
let signupEmailInput = document.querySelector(".email-signup");
let signupPhoneInput = document.querySelector(".phone-signup");
let signupPasswordInput = document.querySelector(".password-signup");
let signupConfirmPasswordInput = document.querySelector(".confirm-password");
let signupBtn = document.querySelector(".sign-up-btn");

async function addUser(newUser){
    try{
        let response = await fetch(`${userURL}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(newUser)
        })
        let data = await response.json();
        console.log(data);
        fetchUsers() ;
        addCartForUser() ;
    }
    catch(error){
        console.log(error);
    }
}
async function addCartForUser(){
  try{
    cartObj={
        id:userData.length+1,
        userId:userData.length+1
    }
      let response = await fetch(`${baseURL}/carts`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(newUser)
      })
      let data = await response.json();
      console.log(data);
  }
  catch(error){
      console.log(error);
  }
}

function checkExistingUsers(usersList) {
  let obj = {
    email: signupEmailInput.value,
    phone: signupPhoneInput.value,
  };
  for (let i = 0; i < usersList.length; i++) {
    if (usersList[i].email == obj.email || usersList[i].phone == obj.phone) {
      return true;
    }
  }
  return false;
}

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    !signupNameInput.value ||
    !signupEmailInput.value ||
    !signupPhoneInput.value ||
    !signupPasswordInput.value ||
    !signupConfirmPasswordInput.value
  ) {
    toastIntoAction("All fields are required. Please fill in all the fields.", "alert");
    return; // Prevent further execution
  }
  if(signupPhoneInput.value?.length<10){
    toastIntoAction("Phone number must be a 10 digit number!","alert");
    return;
  }
  if (signupPasswordInput.value !== signupConfirmPasswordInput.value) {
    toastIntoAction("Passwords do not match. Please try again.", "alert");
    return;
  }
  if(!validatePassword(signupPasswordInput.value)){
    toastIntoAction("Password should contain 1 special character one number and one uppercase letter and atleast 8 characters", "alert");
    return;
  }
  if (checkExistingUsers(usersList)) {
    toastIntoAction(
      "Account Already Exists with this Email or Phone Number. Please SignIn!", "alert"
    );
  } else {
    let newUser = {
      id: userData.length + 1,
      Name: signupNameInput.value,
      email: signupEmailInput.value,
      phone: signupPhoneInput.value,
      password: signupConfirmPasswordInput.value
    };
    addUser(newUser) ;
    window.location.href = "login.html" ;
  }
});



function validatePassword(password) {
  // Password validation criteria
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLongEnough = password.length >= 8;

  // Check all criteria are met
  return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLongEnough;
}



