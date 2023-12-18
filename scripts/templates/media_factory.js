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
    let totalLikes = 0;

    function getUserMedia() {
        const mediaContainer = document.createElement("div");
        mediaContainer.classList.add("media-container")
    
        // Create the fixed-position element outside the loop
        const fixedPositionElement = document.createElement("div");
        fixedPositionElement.classList.add("fixed-position-element")
        mediaContainer.appendChild(fixedPositionElement);
    
        media.forEach((item) => {
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
                    } <i class="fa ${item.liked ? 'fa-heart' : 'fa-heart-o'}"></i></h3>
                </div>
            `;
    
            // Add click event listener to the 'likes' element
            mediaElement.querySelector(".likes").addEventListener("click", () => {
                if (!item.liked) {
                    totalLikes++;
                    item.likes++;
                    item.liked = true;
                } else {
                    totalLikes--;
                    item.likes--;
                    item.liked = false;
                }
                updateMediaLikes(item);
                updateTotalLikes(totalLikes);
            });
    
            mediaContainer.appendChild(mediaElement);
        });
    
        // Append the fixed-position element to the container after all media elements
        fixedPositionElement.innerHTML = `
            <div class="total-likes"><i class="fa fa-heart"></i> ${totalLikes}</div>
            <div>${photographer.price} $/jour</div>
        `;
    
        return mediaContainer;
    }
    

    return {
        getUserMedia,
    };
}
