import {Fetcher} from "./Fetcher.js";
import {MASTODON_SOCIAL_TRENDING_POST_PER_TAG, MASTODON_SOCIAL_TRENDING_TAGS} from "../consts.js";

export class MastodonFetcher extends Fetcher {
  
  /**
   * 
   * @returns {Promise<Array>} - A promise that resolves to an array of Post elements
   */
  async fetchPosts() {
    const hashtags = await this.#fetchTrendingTagsMastodon(MASTODON_SOCIAL_TRENDING_TAGS);
    let json_posts = [];
    for (const tag of hashtags) {
      let response = await this.#fetchPostsByHashtagMastodon(tag.name);
      for (let i = 0; i < response.length; i++) {
        json_posts.push(response[i]);
      }
    }
    let posts = [];
    json_posts.forEach(post => {
      posts.push(this.#createNewMastodonPost(post));
    });
    return posts;
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