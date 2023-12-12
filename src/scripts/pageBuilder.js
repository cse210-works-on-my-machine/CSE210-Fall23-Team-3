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

    // TODO: blend posts from different instances together rather than having them back to back
    // TODO: sane pre-fetching solution that isn't just one instance
    let posts = [];
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

    const paginator = new Paginator(posts, 10);

    // Enable the next and previous buttons after the first instance is loaded
    nextPage.disabled = false;
    prevPage.disabled = false;

    // Show the buttons again and hide loading animation
    footer.style.display = "";
    loading.style.display = "none";

    return paginator;
}
