import * as constant from "../entity/Constant.js";
import { Fetcher } from "./Fetcher.js";

export class MastodonFetcher extends Fetcher{
    /**
     * 
     * @returns {Promise<Array>} - A promise that resolves to an array of raw post data from the API
     */
    async fetchPosts() {
        try {
            const hashtags = await this.#fetchTrendingTags(constant.MASTODON_SOCIAL_TRENDING_TAGS);
            const posts = []
            for (const tag of hashtags) {
                let response = await this.#fetchPostsByHashtag(tag.name);
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
     *
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
     * @param {string} hashtag - The hashtag to fetch posts for
     * @returns {Promise<Array>} - A promise that resolves to an array of posts for the given hashtag
     */
    async #fetchPostsByHashtag(hashtag) {
      const endpoint  = constant.MASTODON_SOCIAL_TRENDING_POST_PER_TAG + hashtag;
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
  