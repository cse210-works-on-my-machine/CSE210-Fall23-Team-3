import { Display } from "./Display.js"

export class MastodonDisplay extends Display {
    /**
     * 
     * @param {HTMLElement} container - "featuredTagsPosts"
     * @param {Array<Object>} posts - array of raw post objects
     */
    displayPosts(container, posts){
      for (const post of posts) {
          container.appendChild(this.#processPost(post))
      }
      /*let results = this.#interleaveArrays(posts);
      results.forEach(json_post => {
          container.appendChild(this.#processPost(json_post));
      });*/
    }

    // TODO: review this function, remove if not needed
    #interleaveArrays(responses) {
        const maxLength = Math.max(...responses.map(response => response.length));
        const result = [];
      
        for (let i = 0; i < maxLength; i++) {
          for (let j = 0; j < responses.length; j++) {
            if (responses[j].length > i) {
              result.push(responses[j][i]);
            }
          }
        }
      
        return result;
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
