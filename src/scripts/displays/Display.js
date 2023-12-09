/**
 * @interface
 * Display class that will be subclassed by the different Displays
 */
export class Display {
    constructor(){
    }

    displayPost(){
        throw new Error("Not implemented - You must implement displayPost() in a subclass");
    }
}
