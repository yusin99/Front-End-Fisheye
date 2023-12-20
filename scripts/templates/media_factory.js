// Media format
// date: "2011-12-08";
// id: 342550;
// image: "Fashion_Yellow_Beach.jpg";
// likes: 62;
// photographerId: 82;
// price: 55;
// title: "Fashion Yellow Beach";

/**
 * Media template function that encapsulates the logic for creating user media elements
 * and managing the lightbox functionality.
 *
 * @param {Array} data - An array of media data.
 * @param {Object} photographer - Photographer information.
 * @returns {Object} An object with functions for generating user media and lightbox.
 */
function mediaTemplate(data, photographer) {
    const media = data;
    const photographerName = photographer.name;
    let totalLikes = 0;
    let currentImageIndex = 0;
    const mediaContainer = document.createElement("div");
    const mediaImages = [];

    /**
     * Creates a media element based on the provided item data and index.
     *
     * @param {Object} item - The media item data.
     * @param {number} index - The index of the media item.
     */
    function createMediaElement(item, index) {
        const mediaElement = document.createElement("article");
        mediaElement.classList.add("media-element");
        totalLikes += item.likes;
        mediaElement.innerHTML = `
            ${
                item.image
                    ? `<img src="assets/images/${photographerName}/${item.image}" alt="${item.title}" class="book_img" style="object-fit: cover;width: 100%; height: 300px;">`
                    : `<video src="assets/images/${photographerName}/${item.video}" alt="${item.title}" class="book_video" controls style="object-fit: cover;width: 100%; height: 300px;"></video>`
            }
            <div class="legend" style="display: flex; justify-content: space-between; color: #901C1C; padding-top: 10px">
                <h3 aria-label="Titre du média">${item.title}</h3>
                <h3 class="likes" data-media="${item.title}">${
            item.likes
        } <i class="fa ${item.liked ? "fa-heart" : "fa-heart-o"}"></i></h3>
            </div>`;

        mediaElement.querySelector(".likes").addEventListener("click", () => {
            totalLikes = updateLikes(item, totalLikes);
        });

        const imageElement = mediaElement.querySelector(".book_img");
        if (imageElement) {
            imageElement.addEventListener("click", () => {
                currentImageIndex = index;
                console.log(currentImageIndex);
                openLightbox(item.image || item.video);
            });
        }

        mediaContainer.appendChild(mediaElement);
        mediaImages.push(item.image || item.video);
    }

    /**
     * Generates and returns the user's media container.
     *
     * @returns {HTMLElement} The user's media container.
     */
    function getUserMedia() {
        mediaContainer.classList.add("media-container");
        const fixedPositionElement = document.createElement("div");
        fixedPositionElement.classList.add("fixed-position-element");
        mediaContainer.appendChild(fixedPositionElement);

        media.forEach((item, index) => {
            createMediaElement(item, index);
        });

        fixedPositionElement.innerHTML = `
            <div class="total-likes"><i class="fa fa-heart"></i> ${totalLikes}</div>
            <div>${photographer.price} $/jour</div>
        `;

        return mediaContainer;
    }

    /**
     * Generates and returns the lightbox container with navigation controls.
     *
     * @returns {HTMLElement} The lightbox container.
     */
    function generateLightbox() {
        const lightboxContainer = document.createElement("div");
        lightboxContainer.classList.add("lightbox-container");
        lightboxContainer.innerHTML = `
            <div class="photo-container">
                <div class="lightbox-controller-left">&#10094;</div>
                <img src="/" class="lightbox-current-photo"/>
                <div class="lightbox-controller-right">&#10095;</div>
                <div class="close-lightbox">X</div>
            </div>
            <div class="photo-title"></div>`;

        lightboxContainer
            .querySelector(".lightbox-controller-left")
            .addEventListener("click", () => {
                navigateLightbox(-1);
            });

        lightboxContainer
            .querySelector(".lightbox-controller-right")
            .addEventListener("click", () => {
                navigateLightbox(1);
            });

        return lightboxContainer;
    }

    /**
     * Opens the lightbox with the specified image.
     *
     * @param {string} image - The source of the image to display in the lightbox.
     */
    function openLightbox(image) {
        const lightboxContainer = document.querySelector(".lightbox-container");
        const lightboxImage = lightboxContainer.querySelector(
            ".lightbox-current-photo"
        );
        lightboxContainer.style.display = "block";
        lightboxImage.src = `assets/images/${photographerName}/${image}`;
        console.log(lightboxImage.src);

        lightboxContainer
            .querySelector(".close-lightbox")
            .addEventListener("click", () => {
                closeLightbox();
            });
    }

    /**
     * Navigates the lightbox in the specified direction.
     *
     * @param {number} direction - The navigation direction (-1 for left, 1 for right).
     */
    function navigateLightbox(direction) {
        currentImageIndex += direction;
        console.log(currentImageIndex);

        if (currentImageIndex < 0) {
            currentImageIndex = mediaImages.length - 1;
        } else if (currentImageIndex >= mediaImages.length) {
            currentImageIndex = 0;
        }

        openLightbox(mediaImages[currentImageIndex]);
    }

    /**
     * Closes the lightbox, hiding it from view.
     */
    function closeLightbox() {
        const lightboxContainer = document.querySelector(".lightbox-container");
        const lightboxImage = lightboxContainer.querySelector(
            ".lightbox-current-photo"
        );
        lightboxImage.src = "";
        lightboxContainer.style.display = "none";
    }

    return {
        getUserMedia,
        generateLightbox,
    };
}
