document.addEventListener('DOMContentLoaded', function() {
    fetchFeaturedTags();
});

function fetchFeaturedTags() {
    const apiUrl = 'https://mastodon.social/api/v1/trends/tags';

    fetch(apiUrl)
        .then(response => response.json())
        .then(tags => tags.forEach(tag => fetchPostsByHashtag(tag.name)))
        .catch(error => console.error('Error fetching featured tags:', error));
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
