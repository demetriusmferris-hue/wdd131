document.addEventListener("DOMContentLoaded", () => {
    const year = new Date().getFullYear();
    document.getElementById('currentyear').textContent = year;

    const lastModified = new Date(document.lastModified);
    document.getElementById('lastModified').textContent =
        `Last modified: ${lastModified.toLocaleString()}`;
})