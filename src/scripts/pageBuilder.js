import { Paginator } from "./paginator.js";
import { fetchInstanceLists } from "./instanceList.js";

/**
 *
 * @param {Array} HANDLERS
 */
export async function buildPage(HANDLERS) {
    const footer = document.getElementsByTagName("footer")[0];
    const loading = document.getElementById("loading");
    const nextPage = document.getElementById("next-page");
    const prevPage = document.getElementById("prev-page");

    // Hide page buttons and show loading wheel while loading
    footer.style.display = "none";
    loading.style.display = "";

    // Disable the next and previous buttons until the first instance is loaded
    nextPage.disabled = true;
    prevPage.disabled = true;

    const postsByNetwork = {};
    let maxLengthArray = 0;
    const instLists = fetchInstanceLists();
    // Iterate over networks (currently just Mastodon and Lemmy)
    for (const [network, instanceList] of Object.entries(instLists)) {
        // Get object handlers for API and post formatting
        const fetcher = new HANDLERS[network]["fetcher"]();
        const postBuilder = new HANDLERS[network]["postBuilder"]();
        postsByNetwork[network] = [];
        // Iterate over each network's instance list
        for (const url of instanceList) {
            const res = await fetcher.fetchPosts(url);
            if (res === null) continue;
            for (const post of res) {
                postsByNetwork[network].push(postBuilder.buildPost(post));
            }
        }
        maxLengthArray = Math.max(maxLengthArray, postsByNetwork[network].length);
    }

    const posts = [];
    for (let i = 0; i < maxLengthArray; i++) {
        for (const [network] of Object.entries(instLists)) {
            if (i < postsByNetwork[network].length) {
                posts.push(postsByNetwork[network][i]);
            }
        }
    }

    const paginator = new Paginator(posts, 10);

    // Enable the next and previous buttons after the first instance is loaded
    nextPage.disabled = false;
    prevPage.disabled = false;

    // Show the buttons again and hide loading animation
    footer.style.display = "";
    loading.style.display = "none";

    return paginator;
}
