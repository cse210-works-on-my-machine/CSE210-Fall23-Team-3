import {LemmyFetcher} from "./Fetchers/LemmyFetcher.js";
import {MastodonFetcher} from "./Fetchers/MastodonFetcher.js";


/**
 * Main function to fetch posts from various instances.
 */
export class PostFetcher {
    constructor(){
        this.fetchers = []
        this.fetchers.push(new LemmyFetcher())
        this.fetchers.push(new MastodonFetcher())
    }

    async fetchPosts(){
        let posts = []
        for (const fetcher of this.fetchers) {
            let new_posts = await fetcher.fetchPosts()
            posts.push(...new_posts)
        }
        return posts
    }
}
