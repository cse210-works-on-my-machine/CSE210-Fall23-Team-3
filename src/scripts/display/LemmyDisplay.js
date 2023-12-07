import { Display } from "./Display.js"

export class LemmyDisplay extends Display{
    /**
     * 
     * @param {HTMLElement} container - "featuredTagsPosts"
     * @param {Array<Object>} posts - array of raw post objects
     */
    displayPosts(container, posts) {
        posts.forEach(post => {
            container.appendChild(this.#processPost(post))
        });
    }

    /**
     * 
     * @param {Object} post - raw post object from the API
     * @returns - A Post element created from raw json data from the API
     */
    #processPost(post) {
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
