document.addEventListener("DOMContentLoaded", () => {
    const year = new Date().getFullYear();
    document.getElementById('currentyear').textContent = year;

    const lastModified = new Date(document.lastModified);
    document.getElementById('lastModified').textContent =
        `Last modified: ${lastModified.toLocaleString()}`;

    const calculateWindChill = (temperature, windSpeed) => {
        if (temperature > 50 || windSpeed <= 3) {
            return null;
        }

        return 35.74
            + 0.6215 * temperature
            - 35.75 * Math.pow(windSpeed, 0.16)
            + 0.4275 * temperature * Math.pow(windSpeed, 0.16);
    };

    const temperatureText = document.getElementById('temperature-value').textContent;
    const windText = document.getElementById('wind-value').textContent;
    const temperature = Number.parseFloat(temperatureText);
    const windSpeed = Number.parseFloat(windText);
    const windChill = calculateWindChill(temperature, windSpeed);

    document.getElementById('wind-chill').textContent = windChill === null
        ? 'N/A (conditions outside wind-chill formula range)'
        : `${windChill.toFixed(1)}°F`;
})