"use strict";

const token = localStorage.getItem("token");
const logInBtn = document.getElementById("logIn");

document.addEventListener("DOMContentLoaded", () => {

    if (!token) {
        window.location.href = "index.html";
    }

    logInBtn.style.display = "none";

    getData();
});

function logOutUser() {
    // Ta bort token från localStorage
    localStorage.removeItem("token");

    // Återgå till startsidan
    location.reload();
}

//Hämtar in data från databasen
async function getData() {
    const url = "https://nodejs-uppgift4-1.onrender.com/api/skyddad";
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const data = await response.json();
        const workexperienceContainer = document.getElementById("workexperienceContainer");

        if (response.ok) {
            //Loopa igenom datan och skapa article- element för varje jobberfrenhet
            data.forEach(workexperience => {
                const article = document.createElement("article");
                article.dataset._id = workexperience._id; //Ger articlen samma ID som jobberfarenheten
                article.innerHTML = `
                <h2>${workexperience.companyname}</h2>
                <p><strong>Jobbtitel:</strong> ${workexperience.jobtitle}</p>
                <p><strong>Plats:</strong> ${workexperience.location}</p>
                <p><strong>Arbetsbeskrivning:</strong><br>${workexperience.description}</p>
                `;
                workexperienceContainer.appendChild(article);
            });
        }

    } catch (error) {
        console.error("Något gick fel: ", error);
    }
}