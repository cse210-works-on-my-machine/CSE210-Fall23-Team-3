import { Post } from "../js/Post.js";
import * as apiUtils from "../js/apiUtils.js";

document.addEventListener("DOMContentLoaded", function () {
    displayPostsNew();
});

/**
 * Functions that fetches trending tags and displays posts for each tag
 */
async function displayPostsNew() {
    const container = document.getElementById("featuredTagsPosts");
    const hashtags = await apiUtils.fetchTrendingTags();
    hashtags.forEach(async (tag) => {
    const section = document.createElement("section");
    section.innerHTML = `<h2>#${tag.name}</h2>`;
    const posts = await apiUtils.fetchPostsByHashtag(tag.name);
    posts.forEach((post) => {
        const p = Post.fromJSON(post);
        const postDiv = p.getDisplayDiv();
        section.appendChild(postDiv);
        section.appendChild(document.createElement("hr"));
    });
    container.appendChild(section);
    });
}
