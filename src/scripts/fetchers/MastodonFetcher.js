import { Fetcher } from "./Fetcher.js";

export const TAGS_SUFFIX = "/api/v1/trends/tags";
export const POST_SUFFIX = "/api/v1/timelines/tag/:";
export const NUM_MASTODON_POSTS = 15;

export class MastodonFetcher extends Fetcher {
    /**
     * @param {string} instURL - The base endpoint of the mastodon instance
     * @returns {Promise<Array>} - A promise that resolves to an array of raw post data from the API
     */
    async fetchPosts(instURL) {
        try {
            const hashtags = await this.#fetchTrendingTags(instURL + TAGS_SUFFIX);
            const fetchPromises = hashtags.map(tag => this.#fetchPostsByHashtag(instURL, tag.name));
            const timeoutDelay = 10000;
            const responses = await Promise.race(
                [
                    Promise.all(fetchPromises),
                    new Promise((_resolve, reject) => setTimeout(() => reject("Fetch calls timed out."), timeoutDelay)),
                ]);
            const posts = responses.flat();
            posts.push(...posts);
            return posts;
        }
        catch (error) {
            console.error("Failed to fetch trending posts:", error);
            return null;
        }
    }

    /**
     *
     * @param {string} trendingTagsURL - The base endpoint of the mastodon instance
     * @returns {Promise<Array>} - A promise that resolves to an array of trending tags
     */
    async #fetchTrendingTags(trendingTagsURL) {
        try {
            const response = await fetch(trendingTagsURL);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        }
        catch (error) {
            console.error("Failed to fetch trending tags:", error);
            return null;
        }
    }

    /**
     *
     * @param {string} instURL - The base url of the mastodon instance API
     * @param {string} hashtag - The hashtag to fetch posts for
     * @returns {Promise<Array>} - A promise that resolves to an array of posts for the given hashtag
     */
    async #fetchPostsByHashtag(instURL, hashtag) {
        const trendingPostURL = instURL + POST_SUFFIX + hashtag + "?limit=" + NUM_MASTODON_POSTS;
        try {
            const response = await fetch(trendingPostURL);
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        }
        catch (error) {
            console.error(`Failed to fetch posts for hashtag #${hashtag}:`, error);
            return null;
        }
    }
}
