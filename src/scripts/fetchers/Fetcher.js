/**
 * @interface
 * Fetcher class that will be subclassed by the different fetchers
 */
export class Fetcher {
    constructor(){
    }

    async fetchPosts(instanceUrl) {
        throw new Error("Not implemented - You must implement fetchPosts() in a subclass");
    }
}
