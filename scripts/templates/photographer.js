function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    const cleanedName = name.replace(/[^a-zA-Z]/g, "");
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");
        const link = document.createElement("a");

        // Set the href attribute to "#" if you don't have a specific link target
        link.setAttribute("href", `./photographer.html#${id}`);

        link.innerHTML = `
            <img src="${picture}" alt="${cleanedName}" style="object-fit: cover; border-radius: 50%;">
            <h2>${cleanedName}</h2>
            <h4>${city}, ${country}</h4>
            <p style="font-size: 10px;">${tagline}</p>
            <p style="font-size: 9px;">${price}$</p>
        `;

        // Append the link to the article
        article.appendChild(link);

        return article;
    }

    function generatePhotographerCard() {
        const photographerCard = document.createElement("div");
        photographerCard.className = "photograph-section"
        
        photographerCard.innerHTML = `
        <div>
            <h2>${name}</h2>
            <p>${city}, ${country}</p>
            <p>${tagline}</p>
        </div>
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        <img src="${picture}" alt="${cleanedName}" style="object-fit: cover; border-radius: 50%; width: 200px; height: 200px">
    `;

        return photographerCard;
    }

    return {
        name,
        picture,
        getUserCardDOM,
        generatePhotographerCard,
    };
}
