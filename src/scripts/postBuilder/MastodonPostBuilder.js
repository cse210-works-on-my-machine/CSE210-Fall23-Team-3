import { PostBuilder } from "./PostBuilder.js";

export class MastodonPostBuilder extends PostBuilder {
    /**
     *
     * @param {Object} rawPost - The raw json data from the API
     * @returns {Post} A new Post element created from raw json data from the API
     */
    buildPost(rawPost) {
        const newPost = document.createElement("fedi-post");
        newPost.setAttribute("id", rawPost.id);
        newPost.setAttribute("content", rawPost.content);
        newPost.setAttribute("author-name", rawPost.account.username);
        newPost.setAttribute("created-at", rawPost.created_at);
        newPost.setAttribute("author-image-url", rawPost.account.avatar);
        newPost.setAttribute("author-handle", rawPost.account.acct);
        newPost.setAttribute("direct-url", rawPost.url);
        return newPost;
    }
}
