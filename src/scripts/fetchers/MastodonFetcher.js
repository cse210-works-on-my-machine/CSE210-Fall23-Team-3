import * as constant from "../entity/Constant.js";
import { Fetcher } from "./Fetcher.js";


const TAGS_SUFFIX = "/api/v1/trends/tags";
const POST_SUFFIX = "/api/v1/timelines/tag/:";

export class MastodonFetcher extends Fetcher{
    /**
     * @param {string} instURL - The base endpoint of the mastodon instance
     * @returns {Promise<Array>} - A promise that resolves to an array of raw post data from the API
     */
    async fetchPosts(instURL) {
        try {
            const hashtags = await this.#fetchTrendingTags(instURL + TAGS_SUFFIX);
            const posts = []
            for (const tag of hashtags) {
                console.log("Fetching posts for tag: " + tag.name);
                let response = await this.#fetchPostsByHashtag(instURL, tag.name);
                posts.push(...response);
            }
            return posts;
        } catch (error) {
            console.error(`Failed to fetch trending posts:`, error);
            return null;
        }
    }
  
    /**
     *
     * @param {string} endpoint - The base endpoint of the mastodon instance
     * @returns {Promise<Array>} - A promise that resolves to an array of trending tags
     */
    async #fetchTrendingTags(endpoint) {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      } catch (error) {
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
      const endpoint  = instURL + POST_SUFFIX + hashtag;
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      } catch (error) {
        console.error(`Failed to fetch posts for hashtag #${hashtag}:`, error);
        return null;
      }
    }
  }
  