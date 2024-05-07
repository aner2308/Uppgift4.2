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

        if (response.status === 200) {
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
