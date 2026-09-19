document.addEventListener("DOMContentLoaded", () => {
    const year = new Date().getFullYear();
    document.getElementById('currentyear').textContent = year;

    const lastModified = new Date(document.lastModified);
    document.getElementById('lastModified').textContent =
        `Last modified: ${lastModified.toLocaleString()}`;

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isOpen = navLinks.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isOpen);
    });
});