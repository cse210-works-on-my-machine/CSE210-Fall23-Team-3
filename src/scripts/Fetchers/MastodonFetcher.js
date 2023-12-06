import {Fetcher} from "./Fetcher.js";
import {MASTODON_SOCIAL_TRENDING_POST_PER_TAG, MASTODON_SOCIAL_TRENDING_TAGS} from "../consts.js";

function interleaveArrays(responses) {
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


export class MastodonFetcher extends Fetcher {
  
  /**
   * Fetches trending tags and displays posts for each tag in an interleaved manner
   * Webpage container is directly updated to reduce response time
   */
  async fetchPosts() {
    const hashtags = await this.#fetchTrendingTagsMastodon(MASTODON_SOCIAL_TRENDING_TAGS);
    let json_posts = [];
    let responses = [];
    for (const tag of hashtags) {
      let response = await this.#fetchPostsByHashtagMastodon(tag.name);
      responses.push(response);
      this.container.appendChild(this.#createNewMastodonPost(response[0]))  // Add atleast one response now only before loading all the jsons
    }

    let results = interleaveArrays(responses);

    results.forEach(json_post => {
      this.container.appendChild(this.#createNewMastodonPost(json_post));
    });
  }

  /**
   *
   *
   * @returns {Promise<Array>} - A promise that resolves to an array of trending tags
   */
  async #fetchTrendingTagsMastodon(endpoint) {
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
   * @returns
   */
  async #fetchPostsByHashtagMastodon(hashtag) {
    console.log("Fetching posts for hashtag: ", hashtag)
    const endpoint  = MASTODON_SOCIAL_TRENDING_POST_PER_TAG + hashtag;
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

  /**
   * 
   * @param {Object} json_post - The raw json data from the API
   * @returns A new Post element created from raw json data from the API
   */
  #createNewMastodonPost(json_post) {
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

// maybe we should have this function, and call it instead of calling the above functions
// TODO: The below function might not be used at all if we follow the code above
export async function fetchTrendingPosts(){
  const hashtags = await fetchTrendingTagsMastodon(mastodonTagsURL);
  let json_posts = [];
  for (const tag of hashtags) {
    let response = await fetchPostsByHashtagMastodon(tag.name);
    for (let i = 0; i < response.length; i++) {
      json_posts.push(response[i]);
    }
  }
  let posts = [];
  json_posts.forEach(post => {
    posts.push(createNewMastodonPost(post));
  });
  return posts;
}