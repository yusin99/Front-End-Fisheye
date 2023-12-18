function updateTotalLikes(totalLikes) {
    const totalLikesElement = document.querySelector(`.total-likes`);
    if (totalLikesElement) {
        totalLikesElement.innerHTML = `<i class="fa fa-heart"></i> ${totalLikes}`;
    }
}

function updateMediaLikes(item) {
    const likesElement = document.querySelector(`.likes[data-media="${item.title}"]`);
    if (likesElement) {
        likesElement.innerHTML = `${item.likes} <i class="fa ${item.liked ? 'fa-heart' : 'fa-heart-o'}"></i>`;
    }
}