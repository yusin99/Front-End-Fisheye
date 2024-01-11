function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");
        const link = document.createElement("a");

        // Set the href attribute to "#" if you don't have a specific link target
        link.setAttribute("href", `./photographer.html#${id}`);

        link.innerHTML = `
            <img src="${picture}" alt="${name}" style="object-fit: cover; border-radius: 50%;">
            <h2>${name}</h2>
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
        photographerCard.className = "photograph-section";

        photographerCard.innerHTML = `
        <div>
        <h1>${name}</h1>
        <p class="location">${city}, ${country}</p>
        <p class="description">${tagline}</p>
        </div>
        <div style="width: 60%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: row-reverse;">
        <img src="${picture}" alt="${name}" style="object-fit: cover; border-radius: 50%; width: 200px; height: 200px">
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        </div>
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
