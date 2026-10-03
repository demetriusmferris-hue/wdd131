const year = new Date().getFullYear();
document.getElementById('currentyear').textContent = year;

const lastModified = new Date(document.lastModified);
document.getElementById('lastModified').textContent =
    `Last modified: ${lastModified.toLocaleString()}`;

const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const album = document.querySelector('.album');
const pageTitle = document.querySelector('h1');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isOpen = navLinks.classList.contains('active');

    hamburger.setAttribute('aria-expanded', isOpen);
});
function displayTemples(templesToDisplay) {
    album.replaceChildren();

    templesToDisplay.forEach((temple) => {
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        const caption = document.createElement('figcaption');
        const name = document.createElement('h2');
        const location = document.createElement('p');
        const dedication = document.createElement('p');
        const area = document.createElement('p');

        image.src = temple.imageUrl;
        image.alt = temple.altName;
        image.width = 400;
        image.height = 250;
        image.loading = 'lazy';
        name.textContent = temple.templeName;
        location.textContent = temple.location;
        dedication.textContent = `Dedicated: ${temple.dedicated}`;
        area.textContent = `Area: ${temple.area.toLocaleString()} square feet`;

        caption.append(name, location, dedication, area);
        figure.append(image, caption);
        album.appendChild(figure);
    });
}
function filterTemples(filter) {
    switch (filter) {
        case 'old':
            return temples.filter((temple) => Number.parseInt(temple.dedicated, 10) < 1900);
        case 'new':
            return temples.filter((temple) => Number.parseInt(temple.dedicated, 10) > 2000);
        case 'large':
            return temples.filter((temple) => temple.area > 90000);
        case 'small':
            return temples.filter((temple) => temple.area < 10000);
        default:
            return temples;
    }
}
document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const filter = link.dataset.filter;
        const title = link.textContent.trim();

        pageTitle.textContent = title;
        displayTemples(filterTemples(filter));
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    altName: "Exterior view of the Aba Nigeria Temple",
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    altName: "Exterior view of the Manti Utah Temple",
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    altName: "Exterior view of the Payson Utah Temple",
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    altName: "Exterior view of the Yigo Guam Temple",
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    altName: "Exterior view of the Washington D.C. Temple",
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    altName: "Exterior view of the Lima Peru Temple",
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    altName: "Exterior view of the Mexico City Mexico Temple",
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
{
    templeName: "Orlando Florida",
    location: "Orlando, Florida, United States",
    dedicated: "1994, October, 9",
    area: 70000,
    altName: "Exterior view of the Orlando Florida Temple",
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/orlando-florida-temple/orlando-florida-temple-51938-main.jpg"
  },
  {
    templeName: "Florida Fort Lauderdale",
    location: "Fort Lauderdale, Florida, United States",
    dedicated: "2014, May, 4",
    area: 30500,
    altName: "Exterior view of the Fort Lauderdale Florida Temple",
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/fort-lauderdale-florida-temple/fort-lauderdale-florida-temple-3792-main.jpg"
  },
  {
    templeName: "Kona Hawaii",
    location: "Kona, Hawaii, United States",
    dedicated: "2000, January, 23",
    area: 12325,
    altName: "Exterior view of the Kona Hawaii Temple",
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/kona-hawaii-temple/kona-hawaii-temple-40578-main.jpg"
  },
];

displayTemples(temples);