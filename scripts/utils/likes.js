// eslint-disable-next-line no-unused-vars
function updateLikes(item, totalLikes){
    if (!item.liked) {
        totalLikes++;
        item.likes++;
        item.liked = true;
    } else {
        totalLikes--;
        item.likes--;
        item.liked = false;
    }
    const likesElement = document.querySelector(`.likes[data-media="${item.title}"]`);
    if (likesElement) {
        likesElement.innerHTML = `${item.likes} <i class="fa ${item.liked ? 'fa-heart' : 'fa-heart-o'}"></i>`;
    }

    const totalLikesElement = document.querySelector(`.total-likes`);
    if (totalLikesElement) {
        totalLikesElement.innerHTML = `<i class="fa fa-heart"></i> ${totalLikes}`;
    }

    return totalLikes;
}