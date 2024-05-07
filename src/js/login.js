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

        if (response.ok) {
            // Hantera lyckad inloggning, t.ex. omdirigera till en annan sida
            window.location.href = "inloggad.html";
        } else {
            // Hantera misslyckad inloggning, t.ex. visa ett felmeddelande
            alert("Fel användarnamn eller lösenord!");
        }
    } catch (error) {
        console.error("Error:", error);
        // Hantera andra typer av fel, t.ex. nätverksfel
        alert("Ett fel uppstod. Försök igen senare.");
    }
});
