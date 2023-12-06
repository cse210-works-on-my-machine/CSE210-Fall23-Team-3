import * as constant from "../consts.js";

export class LemmyFetcher {
    /**
     * 
     * @returns {Promise<Array>} - A promise that resolves to an array of Post elements
     */
    async fetchPosts() {
        try {
            const result = [];
            const response = await fetch(constant.LEMMY_TRENDING_POSTS);
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            let response_data = await response.json();
            const posts_json = response_data.posts;
            posts_json.forEach(post => {
                result.push(post);
            });
            return result;
        } catch (error) {
            console.error(`Failed to fetch trending posts:`, error);
            return null;
        }
    }
}
