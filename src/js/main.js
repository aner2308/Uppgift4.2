"use strict";

const url = "https://nodejs-uppgift4-1.onrender.com/api/users";

document.addEventListener("DOMContentLoaded", () => {
    getData();
});

async function getData() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        const userContainer = document.getElementById("userContainer");

        //Loopa igenom datan och skapa article- element för varje jobberfrenhet
        data.forEach(user => {
            const article = document.createElement("article");
            article.dataset.id = user.id; //Ger articlen samma ID som jobberfarenheten
            article.innerHTML = `
            <h2>${user.username}</h2>
            <p><strong>Lösenord:</strong> ${user.password}</p>
            `;
            userContainer.appendChild(article);
        });
    } catch (error) {
        console.error("Något gick fel: ", error);
    }
}
