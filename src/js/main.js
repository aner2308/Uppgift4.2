"use strict";

const logOutBtn = document.getElementById("logOut");
const logInBtn = document.getElementById("logIn");
const logInMsg = document.getElementById("inloggad");
const jobbsida = document.getElementById("jobbsida");

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (token) {
        // 
        logInMsg.style.display = "block";

        jobbsida.style.display = "block";

        logOutBtn.style.display = "block";
        logOutBtn.addEventListener("click", logOutUser);

        logInBtn.style.display = "none";
    
    } else {
        logInMsg.style.display = "none";
        logOutBtn.style.display = "none";
        logInBtn.style.display = "block";
        jobbsida.style.display = "none";
    }

});


function logOutUser() {
        // Ta bort token från localStorage
        localStorage.removeItem("token");
    
        // Återgå till startsidan
        location.reload();
}
