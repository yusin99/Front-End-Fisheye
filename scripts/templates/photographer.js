function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    // Remove symbols and spaces from the name, leaving only letters
    const cleanedName = name.replace(/[^a-zA-Z]/g, "");

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.style.objectFit = "cover";
        img.style.borderRadius = "50%";

        const h2 = document.createElement("h2");
        h2.textContent = cleanedName; // Use the cleaned name
        article.appendChild(img);
        article.appendChild(h2);

        // Additional elements directly under h2
        const h4 = document.createElement("h4");
        h4.textContent = `${city}, ${country}`;

        const paragraph1 = document.createElement("p");
        paragraph1.textContent = `${tagline}`;
        paragraph1.style.fontSize = "10px";

        const paragraph2 = document.createElement("p");
        paragraph2.textContent = `${price}$`;
        paragraph2.style.fontSize = "9px";

        // Append elements directly under h2
        article.appendChild(h4);
        article.appendChild(paragraph1);
        article.appendChild(paragraph2);

        return article;
    }

    return { name: cleanedName, picture, getUserCardDOM };
}
