//Mettre le code JavaScript lié à la page photographer.html

// Media format
// date: "2011-12-08";
// id: 342550;
// image: "Fashion_Yellow_Beach.jpg";
// likes: 62;
// photographerId: 82;
// price: 55;
// title: "Fashion Yellow Beach";

function mediaTemplate(data, photographer) {
    const media = data;
    const photographerName = photographer.name;

    function getUserMedia() {
        const mediaContainer = document.createElement("div");
        mediaContainer.style.display = "flex";
        mediaContainer.style.flexWrap = "wrap";  // Allow items to wrap to the next row
        mediaContainer.style.justifyContent = "space-between"; // Spread items evenly

        media.forEach((item) => {
            const mediaElement = document.createElement("article");
            mediaElement.style.boxSizing = "border-box";  // Include padding and border in the element's total width and height
            mediaElement.style.flexBasis = "30%";  // Set flex basis to a percentage for 3 items per row
            mediaElement.style.marginBottom = "20px"; // Add margin between items

            mediaElement.style.height = "351px";
            mediaElement.style.width = "100%";  // Make sure each item takes the full width of its flex container
            mediaElement.innerHTML = `
                ${
                    item.image
                        ? `<img src="assets/images/${photographerName}/${item.image}" alt="${item.title}" class="book_img" style="object-fit: cover;width: 100%; height: 300px;">`
                        : `<video src="assets/images/${photographerName}/${item.video}" alt="${item.title}" class="book_video" controls style="object-fit: cover;width: 100%; height: 300px;"></video>`
                }
                <div class="legend" style="display: flex; justify-content: space-between; color: #901C1C; padding-top: 10px">
                    <h3 aria-label="Titre du média">${item.title}</h3>
                    <h3 class="likes">${item.likes} <i class="fa fa-heart"></i></h3>
                </div>
                <div style="position: fixed; bottom: 0; right: 50px; width: 376px; height: 89px; background: #DB8876; border-radius: 5px;">$${photographer.price}</div>
            `;

            mediaContainer.appendChild(mediaElement);
        });

        return mediaContainer;
    }

    return {
        getUserMedia,
    };
}

