import "../scripts/Post.js"; // Import the custom element
import {PostFetcher} from "./postsFetcher.js"

document.addEventListener("DOMContentLoaded", function () {
    displayPostsNew();
});

/**
 * Functions that fetches trending tags and displays posts for each tag using 
 * custom fedi-post HTML element
 */
async function displayPostsNew() {
    const container = document.getElementById("featuredTagsPosts");
    const postFetcher = new PostFetcher(container);
    await postFetcher.fetchPosts();
}