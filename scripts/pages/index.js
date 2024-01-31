async function getPhotographers() {
    const spinner = document.getElementById("spinner");
    try {
        spinner.style.display = "block"; // Show the spinner

        const response = await fetch("data/photographers.json");
        const photographers = await response.json();

        // Hide the spinner once the data is loaded
        spinner.style.display = "none";

        return { photographers };
    } catch (error) {
        console.error("Error fetching photographers data:", error);
        throw error;
    }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(
        ".photographer_section"
    );

    photographers.forEach((photographer) => {
        // eslint-disable-next-line no-undef
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    try {
        const { photographers } = await getPhotographers();

        // Display data using your actual displayData function
        displayData(photographers.photographers);
    } catch (error) {
        console.error("Initialization error:", error);
    } finally {
        // Hide the spinner in case of success or error
        const spinner = document.getElementById("spinner");
        spinner.style.display = "none";
    }
}

init();
