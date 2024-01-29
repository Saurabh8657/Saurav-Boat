const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


////////// validations

const form = document.querySelector('form');
const signUpName = document.querySelector('#sign-up-name');
const signUpEmail = document.querySelector('#sign-up-email');
const signUpPassword = document.querySelector('#sign-up-password');
const signUpConfirmPassword = document.querySelector('#sign-up-confirm-password');
const signUpBtn = document.querySelector('.sign-up-btn');

signUpName.addEventListener('onkeyup', () => {
    console.log(signUpName.value)
    // if (signUpName.value.length < 3) {
    //     setErrorFor(signUpName, 'Name must be greater than 3 characters');
    // } else {
    //     setSuccessFor(signUpName);
    // }
})


const loginEmail = document.querySelector('#login-email');
const loginPassword = document.querySelector('#login-password');
const signInBtn = document.querySelector('.sign-in-btn');

signInBtn.addEventListener('click', (e) => {
    e.preventDefault();
    validateSignIn();
})
signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    validateSignUp();
})

const validateSignIn = () => {
    const signInEmailValue = loginEmail.value.trim();
    const signInPasswordValue = loginPassword.value.trim();
}
const validateSignUp = () => {
    const signUpNameValue = signUpName.value.trim();
    const signUpEmailValue = signUpEmail.value.trim();
    const signUpPasswordValue = signUpPassword.value.trim();
    const signUpConfirmPasswordValue = signUpConfirmPassword.value.trim();
    ////////name
    if (signUpNameValue === '') {
        setErrorFor(signUpName, 'Name cannot be blank');
    }else if (signUpNameValue.length < 3) {
        setErrorFor(signUpName, 'Name must be greater than 3 characters');
    } else {
        setSuccessFor(signUpName);
    }
    //////////email
    if(signUpEmailValue === '') {
        setErrorFor(signUpEmail, 'Email cannot be blank');
    }else if(!isEmail(signUpEmailValue)) {
        setErrorFor(signUpEmail, 'Email is not valid');
    }else {
        setSuccessFor(signUpEmail);
    }
    ////////password
    if(signUpPasswordValue === '') {
        setErrorFor(signUpPassword, 'Password cannot be blank');
    }else if(signUpPasswordValue.length < 8) {
        setErrorFor(signUpPassword, 'Password must be greater than 8 characters');
    } else {
        setSuccessFor(signUpPassword);
    }
    ////////confirm password
    if(signUpConfirmPasswordValue === '') {
        setErrorFor(signUpConfirmPassword, 'Password cannot be blank');
    }else if(signUpConfirmPasswordValue !== signUpPasswordValue) {
        setErrorFor(signUpConfirmPassword, 'Password does not match');
    } else {
        setSuccessFor(signUpConfirmPassword);
    }
}


function isEmail(signUpEmailValue){
    let atSymbol = signUpEmailValue.indexOf('@');
    if (atSymbol < 1) return false;

    let dot = signUpEmailValue.lastIndexOf('.');
    if (dot <= atSymbol + 2) return false;
    if (dot === signUpEmailValue.length - 1) return false;

    return true;

    // return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(signUpEmailValue);
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.createElement('small');
    small.innerText = message;
    formControl.appendChild(small);
    console.log("formControl");
    formControl.className = 'container error';
    small.innerText = message;
}