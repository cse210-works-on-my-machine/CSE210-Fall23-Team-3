import "./entity/Post.js";
import * as constant from "./entity/Constant.js";
import { PostFactory } from "./PostFactory.js";
import { Post } from "./entity/Post.js";
import { Paginator } from "./paginator.js";

const nextPage = document.getElementById("next-page");
const prevPage = document.getElementById("prev-page");

let currentPage = 1;

/**
 * @type {Paginator}
 */
let paginator = null;

/**
 * @type {Array<Post>}
 * @description The array of posts to paginate
 */
let posts = [];

nextPage.addEventListener("click", function() {
    paginator.nextPage();
});

prevPage.addEventListener("click", function() {
    paginator.prevPage();
});

document.addEventListener("DOMContentLoaded", async function() {
    const container = document.getElementById("featuredTagsPosts");

    // Disable the next and previous buttons until the first instance is loaded
    nextPage.disabled = true;
    prevPage.disabled = true;

    const instances = [constant.LEMMY, constant.MASTODON_SOCIAL];

    // Set up the first instance seperately
    const processors = PostFactory.getPostByInstance(instances[0]);
    const fetcher = processors[0];
    const postBuilder = processors[1];
    const response = await fetcher.fetchPosts();
    for (const post of response) {
        posts.push(postBuilder.buildPost(post));
    }

    paginator = new Paginator(posts, 10);

    // Enable the next and previous buttons after the first instance is loaded
    nextPage.disabled = false;
    prevPage.disabled = false;

    // Set up the rest of the instances
    for (const instance of instances.slice(1)) {
        const processors = PostFactory.getPostByInstance(instance);
        const fetcher = processors[0];
        const postBuilder = processors[1];
        const response = await fetcher.fetchPosts();
        console.log(response);
        for (const post of response) {
            posts.push(postBuilder.buildPost(post));
        }
    }
});



