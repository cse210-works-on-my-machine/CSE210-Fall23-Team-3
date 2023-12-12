import "./entity/Post.js";
import * as constant from "./entity/Constant.js";
import { Post } from "./entity/Post.js";
import { Paginator } from "./paginator.js";
import { fetchInstanceLists } from "./instanceList.js";
import { LemmyFetcher } from "./fetchers/LemmyFetcher.js";
import { LemmyPostBuilder } from "./postBuilder/LemmyPostBuilder.js";
import { MastodonFetcher } from "./fetchers/MastodonFetcher.js";
import { MastodonPostBuilder } from "./postBuilder/MastodonPostBuilder.js";

const nextPage = document.getElementById("next-page");
const prevPage = document.getElementById("prev-page");

const HANDLERS = {
    lemmy: { fetcher: LemmyFetcher, postBuilder: LemmyPostBuilder },
    mastodon: { fetcher: MastodonFetcher, postBuilder: MastodonPostBuilder },
};

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

nextPage.addEventListener("click", function () {
    paginator.nextPage();
});

prevPage.addEventListener("click", function () {
    paginator.prevPage();
});

document.addEventListener("DOMContentLoaded", async function () {
    // Disable the next and previous buttons until the first instance is loaded
    nextPage.disabled = true;
    prevPage.disabled = true;

    // TODO: blend posts from different instances together rather than having them back to back
    // TODO: sane pre-fetching solution that isn't just one instance
    const instLists = fetchInstanceLists();
    for (let [network, instanceList] of Object.entries(instLists)) {
        let fetcher = new HANDLERS[network]["fetcher"]();
        let postBuilder = new HANDLERS[network]["postBuilder"]();
        for (let url of instanceList) {
            let res = await fetcher.fetchPosts(url);
            for (let post of res) {
                posts.push(postBuilder.buildPost(post));
            }
        }
    }

    paginator = new Paginator(posts, 10);

    // Enable the next and previous buttons after the first instance is loaded
    nextPage.disabled = false;
    prevPage.disabled = false;
});
