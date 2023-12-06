import { Fetcher } from "./Fetcher.js";
import { LEMMY_TRENDING_POSTS } from "../consts.js";


export class LemmyFetcher extends Fetcher {

    /**
     * 
     * @returns {Promise<Array>} - A promise that resolves to an array of Post elements
     */
    async fetchPosts() {
        try {
            const response = await fetch(LEMMY_TRENDING_POSTS);
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            let response_data = await response.json();
            const posts_json = response_data.posts
            posts_json.forEach(post => {
                this.container.appendChild(this.#createPost(post))
            });
        } catch (error) {
            console.error(`Failed to fetch trending posts:`, error);
            return null;
        }
    }

    /**
     * 
     * @param {Object} post - raw post object from the API
     * @returns - A Post element created from raw json data from the API
     */
    #createPost(post) {
        let newPost = document.createElement("fedi-post");
        newPost.setAttribute('id', post.post.id);
        newPost.setAttribute('content', this.#extractPostContent(post.post)); // Either a url or body or both. 
        newPost.setAttribute('author-name', post.creator.name);
        newPost.setAttribute('created-at', post.post.published);
        newPost.setAttribute('author-image-url', post.creator.avatar);
        newPost.setAttribute('author-handle', this.#extractAuthorHandle(post));
        return newPost;
    }

    /**
     * 
     * @param {Object} post - Json object from the API
     * @returns {string} - The content of the post
     */
    #extractPostContent(post) {
        let content = "";
        if ("body" in post) {
            content = content.concat(post.body);
        }
        if ("url" in post) {
            content = content.concat("\nURL: ", post.url);
        }
        return content;    
    }

    /**
     * 
     * @param {Object} post - Json object from the API
     * @returns {string} - The author's handle or an empty string if not found 
     */
    #extractAuthorHandle(post) {
        if ("creator" in post) {
            if ("matrix_user_id" in post.creator) {
                return post.creator.matrix_user_id;
            }
        }
        return "";
    }
}