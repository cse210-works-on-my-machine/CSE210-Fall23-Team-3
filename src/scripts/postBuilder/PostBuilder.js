/**
 * @interface
 * Display class that will be subclassed by the different Displays
 */
export class PostBuilder {
    constructor() {
    }

    /**
     * @param {Object} rawPost - The raw json data from the API
     */
    buildPost() {
        throw new Error("Not implemented - You must implement displayPost() in a subclass");
    }
}
