import "../scripts/Post.js"; // Import the custom element
import * as mastodonFetcher from "../scripts/mastodonFetcher.js";
import * as lemmyFetcher from "../scripts/lemmyFetcher.js";

const tagsURL = "https://mastodon.social/api/v1/trends/tags";
const postPrefix = "https://mastodon.social/api/v1/timelines/tag/:"

document.addEventListener("DOMContentLoaded", function () {
    displayPostsNew();
});

/**
 * Functions that fetches trending tags and displays posts for each tag using 
 * custom fedi-post HTML element
 */
async function displayPostsNew() {
    const container = document.getElementById("featuredTagsPosts");
    const hashtags = await mastodonFetcher.fetchTrendingTags(tagsURL);
    hashtags.forEach(async (tag) => {
        const posts = await mastodonFetcher.fetchPostsByHashtag(postPrefix, tag.name);
        posts.forEach((post) => {
            const postDiv = createNewFediPost(post);
            container.appendChild(postDiv);
        });
    });
    console.log("Hello: ", hashtags);
    const lemmyposts = await lemmyFetcher.getTrendingPosts();
    console.log("Hello: ", lemmyposts);
    lemmyposts.forEach((post) => {
        console.log("Post, ", post);
        container.appendChild(post);
    });
}

// this should go in some factory class
function createNewFediPost(json_post) {
    const newPost = document.createElement("fedi-post");
    newPost.setAttribute('id', json_post.id);
    newPost.setAttribute('content', json_post.content);
    newPost.setAttribute('author-name', json_post.account.username);
    newPost.setAttribute('created-at', json_post.created_at);
    newPost.setAttribute('author-image-url', json_post.account.avatar);
    newPost.setAttribute('author-handle', json_post.account.acct);
    return newPost;
}