import { Fetcher } from "./Fetcher.js";

const endpoint = 'https://lemmy.ml/api/v3/post/list?sort=Hot';

export class LemmyFetcher extends Fetcher {

    /**
     * 
     * @returns {Promise<Array>} - A promise that resolves to an array of Post elements
     */
    async fetchPosts() {
        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            let response_data = await response.json();
            let posts = []
            const posts_json = response_data.posts
            console.log("Length: ", posts_json.length)
            posts_json.forEach(post => {
                posts.push(this.#createPost(post))
            });
            return posts
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
        newPost.setAttribute('content', post.post.body); // Either a url or body or both. 
        newPost.setAttribute('author-name', post.creator.name);
        //TODO : handle display names 
        newPost.setAttribute('created-at', post.post.published);
        newPost.setAttribute('author-image-url', post.creator.avatar);
        newPost.setAttribute('author-handle', post.creator.matrix_user_id);
        return newPost;
    }
}