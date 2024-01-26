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
    let media = data;
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
                    ? `<img tabindex="3" src="assets/images/${photographerName}/${item.image}" alt="${item.title}" class="book_asset" style="object-fit: cover;width: 100%; height: 300px; border-radius: 5px;">`
                    : `<video tabindex="3" autoplay src="assets/images/${photographerName}/${item.video}" alt="${item.title}" class="book_asset" controls style="object-fit: cover;width: 100%; height: 300px; border-radius: 5px;"></video>`
            }
            <div  class="legend" style="display: flex; justify-content: space-between; color: #901C1C; padding-top: 10px">
                <h3 aria-label="${item.title}" class="image-title">${item.title}</h3>
                <h3 class="likes" data-media="${item.title}">${
            item.likes
        } <i tabindex="3" class="fa ${item.liked ? "fa-heart" : "fa-heart-o"}"></i></h3>
            </div>`;

        mediaElement.querySelector(".likes").addEventListener("click", () => {
            totalLikes = updateLikes(item, totalLikes);
        });

        const imageElement = mediaElement.querySelector(".book_asset");
        if (imageElement) {
            imageElement.addEventListener("click", () => {
                currentImageIndex = index;
                openLightbox(item);
            });
        }

        mediaContainer.appendChild(mediaElement);
        mediaImages.push(item);
    }

    /**
     * Generates and returns the user's media container.
     *
     * @returns {HTMLElement} The user's media container.
     */
    function getUserMedia(userMedia) {
        mediaContainer.innerHTML = "";
        // Reset totalLikes to zero before calculating the total for the updated media
        totalLikes = 0;
        mediaContainer.classList.add("media-container");
        const fixedPositionElement = document.createElement("div");
        fixedPositionElement.classList.add("fixed-position-element");
        mediaContainer.appendChild(fixedPositionElement);

        (userMedia ? userMedia : media).forEach((item, index) => {
            createMediaElement(item, index);
        });

        fixedPositionElement.innerHTML = `
            <div class="total-likes"><i class="fa fa-heart"></i> ${totalLikes}</div>
            <div>${photographer.price} $/jour</div>
        `;

        return mediaContainer;
    }

    // TODO: add tabindex to elements (not every photo but manage it)
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
                <div class="lightbox-controller-left" tabindex="1">&#10094;</div>
                <img src="/" class="lightbox-current-photo" tabindex="1"/>
                <video autoplay src="/" class="lightbox-current-video" tabindex="1"></video>
                <div class="lightbox-controller-right" tabindex="1">&#10095;</div>
                <div class="close-lightbox" tabindex="1">X</div>
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

        document.addEventListener("keydown", handleKeyPress);

        function handleKeyPress(event) {
            if (event.key === "ArrowLeft") {
                // Navigate to the previous image
                navigateLightbox(-1);
            } else if (event.key === "ArrowRight") {
                // Navigate to the next image
                navigateLightbox(1);
            } else if (event.key === "Escape") {
                // Close the lightbox on Escape key
                closeLightbox();
            }
        }

        return lightboxContainer;
    }

    /**
     * Opens the lightbox with the specified image.
     *
     * @param {string} image - The source of the image to display in the lightbox.
     */
    function openLightbox(asset) {
        let media = asset.image || asset.video;
        const lightboxContainer = document.querySelector(".lightbox-container");
        const mediaExtension = media.split(".").pop().toLowerCase();
        let currentAsset;

        if (["jpg", "jpeg", "png", "gif"].includes(mediaExtension)) {
            currentAsset = "img";
        } else if (["mp4", "webm", "ogg"].includes(mediaExtension)) {
            currentAsset = "video";
        } else {
            // Unsupported media type
            console.error("Unsupported media type");
            return;
        }

        const lightboxAssetImg = lightboxContainer.querySelector(
            ".lightbox-current-photo"
        );
        const lightboxAssetVideo = lightboxContainer.querySelector(
            ".lightbox-current-video"
        );
        const lightboxAssetTitle = lightboxContainer.querySelector(".photo-title")

        lightboxAssetTitle.innerHTML = asset.title;
        lightboxAssetImg.style.display =
            currentAsset === "img" ? "block" : "none";
        lightboxAssetVideo.style.display =
            currentAsset === "video" ? "block" : "none";

        if (currentAsset === "img") {
            lightboxAssetImg.src = `assets/images/${photographerName}/${media}`;
        } else if (currentAsset === "video") {
            lightboxAssetVideo.src = `assets/images/${photographerName}/${media}`;
            lightboxAssetVideo.controls = true;
        }

        lightboxContainer
            .querySelector(".close-lightbox")
            .addEventListener("click", () => {
                closeLightbox();
            });
        lightboxContainer.style.display = "block";
    }

    /**
     * Navigates the lightbox in the specified direction.
     *
     * @param {number} direction - The navigation direction (-1 for left, 1 for right).
     */
    function navigateLightbox(direction) {
        currentImageIndex += direction;

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
    const button = document.querySelector("#button");
    const selectDropdown = document.querySelector("#dropdown");
    const options = document.querySelectorAll(".option");
    const selectLabel = document.querySelector("#select-label");
    const btnArrow = document.querySelector(".btn-arrow");

    button.addEventListener("click", function (e) {
        e.preventDefault();
        toggleHidden();
    });

    function toggleHidden() {
        selectDropdown.classList.toggle("hidden");
        btnArrow.classList.toggle("btn-rotate");
    }

    function setSelectTitle(e) {
        const labelElement = document.querySelector(
            `label[for="${e.target.id}"]`
        ).innerText;
        selectLabel.innerText = labelElement;
        toggleHidden();
        const selectedOption = e.target.value;
        sort(selectedOption);
    }

    // Add event listeners for the options
    options.forEach(function (option) {
        option.addEventListener("click", function (e) {
            setSelectTitle(e);
        });
    });

    // External function named 'sort'
    function sort(option) {
        // Create a copy of the main array
        const sortedMedia = [...media];

        // Perform sorting based on the selected option
        switch (option) {
            case "title":
                sortedMedia.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "date":
                // Assuming 'date' is a property in your media objects
                sortedMedia.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case "popularity":
                sortedMedia.sort((a, b) => b.likes - a.likes);
                break;
            default:
                console.log("Invalid sorting option");
                return;
        }

        // Generate the updated mediaImages array based on the sorted order
        const updatedMediaImages = sortedMedia.map(
            (item) => item.image || item.video
        );

        // Update mediaImages
        mediaImages.length = 0; // Clear existing items
        mediaImages.push(...updatedMediaImages);

        // After sorting, update and re-render the user media
        const updatedMediaContainer = getUserMedia(sortedMedia);

        // Replace the existing media container with the updated one
        const existingMediaContainer =
            document.querySelector(".media-container");
        existingMediaContainer.parentNode.replaceChild(
            updatedMediaContainer,
            existingMediaContainer
        );
    }

    return {
        getUserMedia,
        generateLightbox,
    };
}
