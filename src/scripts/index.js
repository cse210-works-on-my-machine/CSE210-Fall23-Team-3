import "./entity/Post.js";
import * as constant from "./entity/Constant.js"
import { PostFactory } from "./PostFactory.js";

document.addEventListener("DOMContentLoaded", async function() {
    const container = document.getElementById("featuredTagsPosts");
    // simulate user's choice
    const instance = constant.MASTODON_SOCIAL;
    const processors = PostFactory.getPostByInstance(instance);

    const fetcher = processors[0];
    const display = processors[1];
    const posts = await fetcher.fetchPosts();
    display.displayPosts(container, posts);
});
