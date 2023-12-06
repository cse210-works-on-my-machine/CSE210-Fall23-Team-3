export class MastodonDisplay {

    displayPosts(container, posts){
        for (const post of posts) {
            container.appendChild(this.#processPost(post));
        }
    }

    /**
     * 
     * @param {Object} json_post - The raw json data from the API
     * @returns A new Post element created from raw json data from the API
     */
    #processPost(json_post) {
        const newPost = document.createElement("fedi-post");
        newPost.setAttribute('id', json_post.id);
        newPost.setAttribute('content', json_post.content);
        newPost.setAttribute('author-name', json_post.account.username);
        newPost.setAttribute('created-at', json_post.created_at);
        newPost.setAttribute('author-image-url', json_post.account.avatar);
        newPost.setAttribute('author-handle', json_post.account.acct);
        return newPost;
    }
}
