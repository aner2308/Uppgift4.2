document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (!token) {
        // Giltigt token saknas, omdirigera till startsidan
        window.location.href = "index.html";
    }
});
