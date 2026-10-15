const favoriteStorageKey = "brickBeyondFavorites";
const creationStorageKey = "brickBeyondCreations";

const bigBuilds = [
  {
    id: "world-map",
    name: "World Map",
    set: "31203",
    pieces: 11695,
    year: 2021,
    theme: "lego-art",
    themeName: "LEGO Art",
    detail: "A large-scale world map mosaic that can be customized with different ocean patterns."
  },
  {
    id: "eiffel-tower",
    name: "Eiffel Tower",
    set: "10307",
    pieces: 10001,
    year: 2022,
    theme: "icons",
    themeName: "LEGO Icons",
    detail: "A 149 cm-tall landmark model with four viewing platforms and a broad base."
  },
  {
    id: "titanic",
    name: "Titanic",
    set: "10294",
    pieces: 9090,
    year: 2021,
    theme: "icons",
    themeName: "LEGO Icons",
    detail: "A 135 cm-long display model that separates into three sections to reveal interiors."
  },
  {
    id: "colosseum",
    name: "Colosseum",
    set: "10276",
    pieces: 9036,
    year: 2020,
    theme: "icons",
    themeName: "LEGO Icons",
    detail: "A detailed architectural model inspired by the ancient Roman amphitheatre."
  },
  {
    id: "millennium-falcon",
    name: "Millennium Falcon",
    set: "75192",
    pieces: 7541,
    year: 2017,
    theme: "star-wars",
    themeName: "Star Wars",
    detail: "An Ultimate Collector Series model with removable hull panels and a detailed interior."
  },
  {
    id: "at-at",
    name: "AT-AT",
    set: "75313",
    pieces: 6785,
    year: 2021,
    theme: "star-wars",
    themeName: "Star Wars",
    detail: "A large Ultimate Collector Series Imperial walker with an articulated head and interior."
  },
  {
    id: "razor-crest",
    name: "The Razor Crest",
    set: "75331",
    pieces: 6187,
    year: 2022,
    theme: "star-wars",
    themeName: "Star Wars",
    detail: "An Ultimate Collector Series transport with a removable cockpit and interior sections."
  },
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    set: "10256",
    pieces: 5923,
    year: 2017,
    theme: "architecture",
    themeName: "Architecture",
    detail: "A recreation of the white-marble mausoleum, with a central dome and four minarets."
  }
];

function getStoredArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? `[]`);
    return Array.isArray(value) ? value : [];
  } catch (error) {
    console.error(`Could not read ${key} from local storage.`, error);
    return [];
  }
}

function setStatus(element, message, state) {
  if (!element) return;
  element.textContent = message;
  if (state) {
    element.dataset.state = state;
  } else {
    delete element.dataset.state;
  }
}

function setupNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-nav");
  if (!toggle || !navigation) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", `${!isOpen}`);
    toggle.querySelector(".visually-hidden").textContent = isOpen ? `Open navigation menu` : `Close navigation menu`;
    navigation.classList.toggle("is-open", !isOpen);
  });
}

function setupYear() {
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = `${new Date().getFullYear()}`;
  });

  const lastModified = new Date(document.lastModified);
  document.querySelectorAll("[data-last-modified]").forEach((element) => {
    element.setAttribute("datetime", lastModified.toISOString());
    element.textContent = `${lastModified.toLocaleString()}`;
  });
}

function renderBuilds() {
  const list = document.querySelector("#build-list");
  if (!list) return;

  const filter = document.querySelector("#theme-filter");
  const favoritesButton = document.querySelector("#show-favorites");
  const count = document.querySelector("#build-count");
  let showFavorites = false;
  let favorites = getStoredArray(favoriteStorageKey);

  const render = () => {
    const selectedTheme = filter.value;
    const visibleBuilds = bigBuilds
      .filter((build) => selectedTheme === "all" || build.theme === selectedTheme)
      .filter((build) => !showFavorites || favorites.includes(build.id));

    count.textContent = `${visibleBuilds.length} ${visibleBuilds.length === 1 ? "build" : "builds"} shown`;
    list.innerHTML = visibleBuilds.length
      ? visibleBuilds.map((build) => {
        const saved = favorites.includes(build.id);
        return `
          <article class="build-card">
            <div class="build-card-top">
              <span class="build-theme">${build.themeName}</span>
              <button class="favorite-button" type="button" data-favorite-id="${build.id}" aria-pressed="${saved}">
                ${saved ? "★ Saved" : "☆ Save"}
              </button>
            </div>
            <h3>${build.name}</h3>
            <p>${build.detail}</p>
            <div class="build-stats">
              <span>Set <strong>${build.set}</strong></span>
              <span><strong>${build.pieces.toLocaleString()}</strong> pieces</span>
              <span>Released <strong>${build.year}</strong></span>
            </div>
          </article>
        `;
      }).join(``)
      : `<p class="empty-state">No builds match this view yet. Change the theme filter or show all builds.</p>`;
  };

  list.addEventListener("click", (event) => {
    const button = event.target.closest("[data-favorite-id]");
    if (!button) return;
    const id = button.dataset.favoriteId;
    favorites = favorites.includes(id)
      ? favorites.filter((favorite) => favorite !== id)
      : [...favorites, id];
    try {
      localStorage.setItem(favoriteStorageKey, JSON.stringify(favorites));
      render();
    } catch (error) {
      console.error(`Could not save build favorites to local storage.`, error);
      setStatus(count, `Your browser could not save favorites. Check its storage settings.`, `error`);
    }
  });

  filter.addEventListener("change", render);
  favoritesButton.addEventListener("click", () => {
    showFavorites = !showFavorites;
    favoritesButton.setAttribute("aria-pressed", `${showFavorites}`);
    favoritesButton.textContent = showFavorites ? `Show all builds` : `Show saved favorites`;
    render();
  });
  render();
}

function escapeHTML(value) {
  return `${value}`.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": `&amp;`,
      "<": `&lt;`,
      ">": `&gt;`,
      "\"": `&quot;`,
      "'": `&#39;`
    };
    return entities[character];
  });
}

function renderCreations(container, creations) {
  if (!container) return;
  container.innerHTML = creations.length
    ? creations.map((creation) => `
      <article class="saved-creation">
        <h3>${escapeHTML(creation.title)}</h3>
        <p>By ${escapeHTML(creation.creatorName)} · ${escapeHTML(creation.category)}</p>
        <p>${escapeHTML(creation.story)}</p>
      </article>
    `).join(``)
    : `<p class="empty-state">No creations saved yet. Add the first one with the form.</p>`;
}

function setupCreationForm() {
  const form = document.querySelector("#creation-form");
  if (!form) return;

  const status = document.querySelector("#form-status");
  const photoInput = document.querySelector("#creation-photo");
  const previewWrap = document.querySelector("#upload-preview-wrap");
  const preview = document.querySelector("#upload-preview");
  const savedCreations = document.querySelector("#saved-creations");
  const clearButton = document.querySelector("#clear-creations");
  let previewUrl = "";
  let creations = getStoredArray(creationStorageKey).filter((creation) =>
    creation && typeof creation.title === "string" &&
    typeof creation.creatorName === "string" &&
    typeof creation.category === "string" &&
    typeof creation.story === "string"
  );
  renderCreations(savedCreations, creations);

  photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = "";
    previewWrap.hidden = true;
    preview.removeAttribute("src");
    setStatus(status, ``, ``);
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type) || file.size > 4 * 1024 * 1024) {
      photoInput.value = "";
      setStatus(status, `Choose a JPEG, PNG, or WebP image smaller than 4 MB.`, `error`);
      return;
    }

    previewUrl = URL.createObjectURL(file);
    preview.src = previewUrl;
    previewWrap.hidden = false;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const creation = {
      creatorName: data.get("creatorName").trim(),
      title: data.get("title").trim(),
      category: data.get("category"),
      story: data.get("story").trim()
    };
    if (!creation.creatorName || !creation.title || !creation.story) {
      setStatus(status, `Please complete each required text field.`, `error`);
      return;
    }

    const updatedCreations = [creation, ...creations].slice(0, 20);
    try {
      localStorage.setItem(creationStorageKey, JSON.stringify(updatedCreations));
      creations = updatedCreations;
      renderCreations(savedCreations, creations);
      form.reset();
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      previewUrl = "";
      previewWrap.hidden = true;
      preview.removeAttribute("src");
      setStatus(status, `Your creation is saved in this browser.`, `success`);
    } catch (error) {
      console.error(`Could not save this creation to local storage.`, error);
      setStatus(status, `Your browser could not save this creation. Check its storage settings and try again.`, `error`);
    }
  });

  clearButton.addEventListener("click", () => {
    try {
      localStorage.removeItem(creationStorageKey);
      creations = [];
      renderCreations(savedCreations, creations);
      setStatus(status, `Your saved creations have been cleared.`, `success`);
    } catch (error) {
      console.error(`Could not clear creations from local storage.`, error);
      setStatus(status, `Your browser could not clear the saved creations.`, `error`);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupYear();
  renderBuilds();
  setupCreationForm();
});
