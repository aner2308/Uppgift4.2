"use strict";

const logOutBtn = document.getElementById("logOut");
const logInBtn = document.getElementById("logIn");
const jobbsida = document.getElementById("jobbsida");

document.addEventListener("DOMContentLoaded", () => {

    logOutBtn.style.display = "none";
    logInBtn.style.display = "block"
    jobbsida.style.display = "none";

});

document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("https://nodejs-uppgift4-1.onrender.com/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        let data = await response.json();

        if (response.ok) {
            // Hantera lyckad inloggning
            const token = data.response.token;
            console.log(token);
            localStorage.setItem("token", token);

            // Hämta refererande sidan från header eller sessionStorage om den finns
            const referer = sessionStorage.getItem("referer") || document.referrer;

            // Om det finns en refererande sida, gå tillbaka dit, annars till index.html
            window.location.href = referer || "index.html";
        } else {
            // Hantera misslyckad inloggning
            alert("Fel användarnamn eller lösenord!");
        }
    } catch (error) {
        console.error("Error:", error);
        // Hantering av andra typer av fel
        alert("Ett fel uppstod. Försök igen senare.");
    }
});

const registerFormEl = document.getElementById("registerForm");

registerFormEl.addEventListener("submit", registerNew);

async function registerNew(event) {
    event.preventDefault();

    const usernameEl = document.getElementById("username2").value;
    const passwordEl = document.getElementById("password2").value;

    if (usernameEl.trim().length < 6) {
        alert("Användarnamnet måste vara minst 6 tecken långt.")
        return;
    }

    if (passwordEl.trim().length < 6) {
        alert("Lösenordet måste vara minst 6 tecken långt.")
        return;
    }

    await newUser(usernameEl, passwordEl);

    document.getElementById("username2").value = "";
    document.getElementById("password2").value = "";
}

async function newUser(usernameEl, passwordEl) {

    const url = "https://nodejs-uppgift4-1.onrender.com/api/register";

    let user = {
        username: usernameEl,
        password: passwordEl
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    //Validera input
    if (!usernameEl || !passwordEl) {
        return alert("Felaktig inmatning, skriv in användarnamn och lösenord...");
    }

    //Kontrollerar användarnamnets längd
    if (usernameEl.length < 5) {
        return alert("Användarnamnet måste vara minst fem tecken långt." );
    }

    //Kontrollerar att lösenordet har minst en stor bokstav, minst en siffra och minst sex tecken långt
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(passwordEl)) {
        return alert("Lösenordet måste innehålla minst en stor bokstav, minst en siffra och vara minst sex tecken långt.");
    }

    if (response.ok) {
        // Visa meddelande om lyckad registrering
        document.getElementById("registrationMessage").style.display = "block";
    } else {
        // Hantera misslyckad registrering
        alert("Användarnamnet är upptaget!");
    }


}
