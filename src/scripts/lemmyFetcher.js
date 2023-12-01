/**
 * Gets trending posts from lemmy
 */
export async function getTrendingPosts(){
    const endpoint = 'https://lemmy.ml/api/v3/post/list?sort=Hot'
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        let response_data = await response.json();
        let posts = []
        const posts_json = response_data.posts
        posts_json.forEach(post => {
            console.log('Body: ', post.body)
            let newPost = document.createElement("fedi-post");
            newPost.setAttribute('id', post.post.id);
            newPost.setAttribute('content', post.post.body);
            newPost.setAttribute('author-name', post.creator.display_name);
            newPost.setAttribute('created-at', post.post.published);
            newPost.setAttribute('author-image-url', post.creator.avatar);
            newPost.setAttribute('author-handle', post.creator.matrix_user_id);
            posts.push(newPost)
        });
        return posts
    } catch (error) {
        console.error(`Failed to fetch trending posts:`, error);
        return null;
    }
}