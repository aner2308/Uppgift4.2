"use strict";

//Kontrollerar om användaren har ett giltigt token i LocalStorage 
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (token) {
        // Giltigt token finns, omdirigera till inloggad.html
        window.location.href = "inloggad.html";
    }
});
