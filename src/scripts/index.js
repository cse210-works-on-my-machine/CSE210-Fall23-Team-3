import "../scripts/Post.js"; // Import the custom element
import * as mastodonFetcher from "../scripts/mastodonFetcher.js";
import * as lemmyFetcher from "../scripts/lemmyFetcher.js";

document.addEventListener("DOMContentLoaded", function () {
    displayPostsNew();
});

/**
 * Functions that fetches trending tags and displays posts for each tag using 
 * custom fedi-post HTML element
 */
async function displayPostsNew() {
    const container = document.getElementById("featuredTagsPosts");
    
    const mastodonPosts = await mastodonFetcher.fetchTrendingPosts();    
    mastodonPosts.forEach((post) => {
        container.appendChild(post);
    });

    const lemmyPosts = await lemmyFetcher.getTrendingPosts();
    console.log("Hello: ", lemmyPosts);
    lemmyPosts.forEach((post) => {
        console.log("Post, ", post);
        container.appendChild(post);
    });
}

// this should go in some factory class
