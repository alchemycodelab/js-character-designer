import { 
    redirectToBuild, 
    signInUser, 
    signupUser,
} from './fetch-utils.js';

const signInForm = document.getElementById('sign-in');
const signInEmail = document.getElementById('sign-in-email');
const signInPassword = document.getElementById('sign-in-password');

const signUpForm = document.getElementById('sign-up');
const signUpEmail = document.getElementById('sign-up-email');
const signUpPassword = document.getElementById('sign-up-password');

// if user currently logged in, redirect
redirectToBuild();

signUpForm.addEventListener('submit', async(event) => {
    event.preventDefault();
    const user = await signupUser(signUpEmail.value, signUpPassword.value);

    if (user){
        redirectToBuild();
    } else {
        console.error(user);
    }
});

signInForm.addEventListener('submit', async(event)=>{
    event.preventDefault();
    const user = await signInUser(signInEmail.value, signInPassword.value);
    
    if (user){
        redirectToBuild();
    } else {
        console.error(user);
    }
});
