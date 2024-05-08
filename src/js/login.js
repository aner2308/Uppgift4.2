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
            window.location.href = "inloggad.html";
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

    if (response.ok) {
        // Visa meddelande om lyckad registrering
        document.getElementById("registrationMessage").style.display = "block";
    } else {
        // Hantera misslyckad registrering
        alert("Något gick fel!");
    }


}
