/**
 *
 * @returns {Promise<Array>} - A promise that resolves to an array of trending tags
 */
export async function fetchTrendingTags() {
  const endpoint = "https://mastodon.social/api/v1/trends/tags";
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
export async function fetchPostsByHashtag(hashtag) {
  const endpoint = `https://mastodon.social/api/v1/timelines/tag/:${hashtag}`;
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
