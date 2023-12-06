import {LemmyFetcher} from "./Fetchers/LemmyFetcher.js";
import {MastodonFetcher} from "./Fetchers/MastodonFetcher.js";


/**
 * Main function to fetch posts from various instances.
 */
export class PostFetcher {
    constructor(container){
        this.container = container
        this.fetchers = []
        this.fetchers.push(new LemmyFetcher(container))
        this.fetchers.push(new MastodonFetcher(container))
    }

    async fetchPosts(){
        for (const fetcher of this.fetchers) {
            await fetcher.fetchPosts()
        }
    }
}
