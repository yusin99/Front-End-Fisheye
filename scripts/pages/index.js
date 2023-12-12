    async function getPhotographers() {

            try {
                // Utilize Fetch to get data from your JSON file
                const response = await fetch('data/photographers.json');
                const photographers = await response.json();
        
                // Log the fetched data to the console for verification
                console.log(photographers);
        
                // Return the photographers array
                return { photographers };
            } catch (error) {
                console.error('Error fetching photographers data:', error);
                throw error;
            }
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers.photographers);
    }
    
    init();
    
