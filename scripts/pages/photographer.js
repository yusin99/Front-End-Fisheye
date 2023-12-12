//Mettre le code JavaScript lié à la page photographer.html

// Function to fetch data for a single photographer based on ID
function getPhotographerDataById(photographerId) {
    // Make an AJAX request to fetch data for all photographers
    return fetch(`data/photographers.json`)
        .then((response) => response.json())
        .then((data) => {
            // Convert photographerId to a number
            const numericPhotographerId = parseInt(photographerId, 10);

            // Filter media and photographer information for the specific photographer
            const photographerData = {
                media: data.media.filter((item) => item.photographerId === numericPhotographerId),
                photographer: data.photographers.find((photographer) => photographer.id === numericPhotographerId),
            };
            return photographerData;
        })
        .catch((error) =>
            console.error("Error fetching photographer data:", error)
        );
}

// Example usage
const photographerId = window.location.hash.substring(1);
getPhotographerDataById(photographerId).then((data) => {
    // Handle the data for the specific photographer
    console.log("Photographer Data:", data);
});

