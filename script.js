import {Post} from './src/post.js';

document.addEventListener('DOMContentLoaded', function() {
    displayPostsNew();
});

/**
 * 
 * @returns {Promise<Array>} - A promise that resolves to an array of trending tags
 */
async function fetchTrendingTags() {
    const endpoint = 'https://mastodon.social/api/v1/trends/tags';
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error('Failed to fetch trending tags:', error);
        return null;
    }
}

/**
 * 
 * @param {string} hashtag - The hashtag to fetch posts for
 * @returns 
 */
async function fetchPostsByHashtag(hashtag) {
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

/**
 * Functions that fetches trending tags and displays posts for each tag
 */
async function displayPostsNew() {
    const container = document.getElementById('featuredTagsPosts');
    const hashtags = await fetchTrendingTags();
    hashtags.forEach(async tag => {
        const section = document.createElement('section');
        section.innerHTML = `<h2>#${tag.name}</h2>`;
        const posts = await fetchPostsByHashtag(tag.name);
        posts.forEach(post => {
            const p = Post.fromJSON(post);
            const postDiv = p.getDisplayDiv();
            section.appendChild(postDiv);
        });
        container.appendChild(section);
    });
}