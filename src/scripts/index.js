import "./entity/Post.js";
import * as constant from "./consts.js"
import { PostFactory } from "./PostFactory.js";

document.addEventListener("DOMContentLoaded", async function() {
    const container = document.getElementById("featuredTagsPosts");
    // simulate user's choice
    const instance = constant.LEMMY;
    const processors = PostFactory.getPostByInstance(instance);
    // Lemmy
    const fetcher = processors[0];
    const display = processors[1];

    const posts = await fetcher.fetchPosts();
    display.displayPosts(container, posts);

});
