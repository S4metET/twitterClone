const tweetButton = document.querySelector(".gonder");
const tweetInput = document.querySelector(".postContent input");
const postsContainer = document.querySelector(".new-post");
let postList = [];
if (localStorage.getItem("posts")) {
    postList = JSON.parse(localStorage.getItem("posts"));
}
tweetButton.addEventListener("click", () => {
    const tweetText = tweetInput.value.trim();
    if (tweetText === "") {
        alert("Tweet cannot be empty!");
        return;
    }
    const newId = postList.length ? postList[postList.length - 1].id + 1 : 1;
    postList.push({
        id: newId,
        text: tweetText,
        like: 0,
    });
    localStorage.setItem("posts", JSON.stringify(postList));
    renderPosts();
    tweetInput.value = "";
});
function bindLikeButtons() {
    const likeButtons = document.querySelectorAll(".like-btn");
    likeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const postId = Number(button.dataset.id);
            const post = postList.find((p) => p.id === postId);
            if (post) {
                post.like += 1;
                localStorage.setItem("posts", JSON.stringify(postList));
                renderPosts();
            }
        });
    });
}
function renderPosts() {
    postsContainer.innerHTML = "";
    postList.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post-item");
        postElement.innerHTML = `
            <div class="post-header">
            <img src="assets/img/elonMusk.png" alt="User Avatar" class="post-avatar">
            <p class="post-author">Samet Eren Terzi <span>@s4metet</span></p>
            <div class="like">
            <p class="post-text">${post.text}</p>
                <button class="like-btn" data-id="${post.id}">
                <i class="fas fa-heart"></i> Like (${post.like})
                </button>
                </div>
                </div>
        `;
        postsContainer.appendChild(postElement);
    });
    bindLikeButtons();
}
renderPosts();