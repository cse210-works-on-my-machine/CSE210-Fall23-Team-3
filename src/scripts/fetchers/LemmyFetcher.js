import { Fetcher } from "./Fetcher.js";

const NUM_POSTS = 50;
const API_V3 = "/api/v3/post/list?sort=Hot";

export class LemmyFetcher extends Fetcher {
    /**
     * @param {string} instanceUrl - The base url of the Lemmy instance's API
     * @returns {Promise<Array>} - A promise that resolves to an array of raw posts from the API
     */
    async fetchPosts(instanceUrl) {
        const posts = [];
        try {
            const url = instanceUrl + API_V3 + "&limit=" + NUM_POSTS;

            const timeoutDelay = 10000;
            const response = await Promise.race([
                fetch(url),
                new Promise((_resolve, reject) => setTimeout(() => reject("Fetch calls timed out."), timeoutDelay)),
            ]);

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            const response_data = await response.json();
            const posts_json = response_data.posts;
            posts_json.forEach((post) => {
                posts.push(post);
            });
            return posts;
        }
        catch (error) {
            console.error("Failed to fetch trending posts:", error);
            return null;
        }
    }
}
