import * as constant from "../entity/Constant.js";
import { Fetcher } from "./Fetcher.js";

const NUM_POSTS = 50;

export class LemmyFetcher extends Fetcher {
    /**
     * 
     * @returns {Promise<Array>} - A promise that resolves to an array of raw posts from the API
     */
    async fetchPosts() {
        const posts = [];
        try {
            const url = constant.LEMMY_TRENDING_POSTS + "&limit=" + NUM_POSTS;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            let response_data = await response.json();
            const posts_json = response_data.posts;
            posts_json.forEach(post => {
                posts.push(post);
            });
            return posts;
        } catch (error) {
            console.error(`Failed to fetch trending posts:`, error);
            return null;
        }
    }
}