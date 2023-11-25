document.addEventListener('DOMContentLoaded', function() {
    displayPostsNew();
});


function fetchFeaturedTags() {
    const apiUrl = 'https://mastodon.social/api/v1/trends/tags';

    fetch(apiUrl)
        .then(response => response.json())
        .then(tags => tags.forEach(tag => fetchPostsByHashtag(tag.name)))
        .catch(error => console.error('Error fetching featured tags:', error));
}

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
    const endpoints = `https://mastodon.social/api/v1/timelines/tag/:${hashtag}`;
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
            const postDiv = document.createElement('div');
            postDiv.innerHTML = `<p>${post.content}</p>`; // Sanitize this content
            section.appendChild(postDiv);
        });
        container.appendChild(section);
    });
}



function fetchPostsByHashtag(hashtag) {
    const apiUrl = `https://mastodon.social/api/v1/timelines/tag/:${hashtag}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayPosts(hashtag, data))
        .catch(error => console.error(`Error fetching posts for #${hashtag}:`, error));
}

function displayPosts(hashtag, data) {
    const container = document.getElementById('featuredTagsPosts');
    const section = document.createElement('section');
    section.innerHTML = `<h2>#${hashtag}</h2>`;
    data.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.innerHTML = `<p>${post.content}</p>`; // Sanitize this content
        section.appendChild(postDiv);
    });
    container.appendChild(section);
}
