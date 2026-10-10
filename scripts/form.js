const yearElement = document.querySelector("#currentyear");
const lastModifiedElement = document.querySelector("#lastModified");

if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
}

if (lastModifiedElement) {
    const lastModified = new Date(document.lastModified);
    lastModifiedElement.textContent = `Last modified: ${lastModified.toLocaleString()}`;
}

const params = new URLSearchParams(window.location.search);
const submittedProduct = params.get("product");
const rating = Number(params.get("rating"));
const installationDate = params.get("installation-date");
const hasValidInstallationDate =
    installationDate !== null &&
    /^\d{4}-\d{2}-\d{2}$/.test(installationDate) &&
    Number.isFinite(Date.parse(`${installationDate}T00:00:00Z`));
const isSuccessfulSubmission =
    products.some((product) => product.id === submittedProduct) &&
    Number.isInteger(rating) &&
    rating >= 1 &&
    rating <= 5 &&
    hasValidInstallationDate;
const countElement = document.querySelector("#review-count");
const messageElement = document.querySelector("#confirmation-message");

if (countElement && messageElement) {
    try {
        const previousCount = Number.parseInt(localStorage.getItem("reviewCount") ?? "0", 10);

        if (!Number.isSafeInteger(previousCount) || previousCount < 0) {
            throw new Error("The saved review count is invalid.");
        }

        if (isSuccessfulSubmission) {
            const reviewCount = previousCount + 1;
            localStorage.setItem("reviewCount", String(reviewCount));
            countElement.textContent = String(reviewCount);
        } else {
            messageElement.textContent = "A completed review submission was not found. Please use the form to submit a review.";
            countElement.textContent = String(previousCount);
        }
    } catch (error) {
        messageElement.textContent = isSuccessfulSubmission
            ? "Your review was submitted, but the review count could not be saved in this browser."
            : "The saved review count could not be read in this browser.";
        countElement.textContent = "Unavailable";
        console.error("Unable to read or update the review count in local storage.", error);
    }
}
const productSelect = document.querySelector("#product");

if (productSelect) {
    products.forEach((product) => {
        const option = document.createElement("option");
        option.value = product.id;
        option.textContent = product.name;
        productSelect.append(option);
    });
}