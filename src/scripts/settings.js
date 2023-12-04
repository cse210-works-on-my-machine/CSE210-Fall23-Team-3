const DEFAULT_LISTS = {
    mastodon:["https://mastodon.social"],
    lemmy:["https://lemmy.ml"],
}
// TODO: figure out how to generalize this to any Fediverse network
// Could use dependency injection and pass the network name
// and then look up local storage instance list
function addInstance(network) {

}

function removeInstance(network) {

}

/**
 * @param network A string indicating the name of the network this is an instance of 
 * @param url The URL to ping as a valid network instance
 * @returns True if the instance URL is valid, False otherwise
 */
function verifyInstance(network, url) {
    return true;
}

function resetInstanceList() {

}

// useful for fetching stuff/algorithm, read from local storage
// also for loading settings page
// if localstorage empty return default instance list?
/**
 * 
 * @param {string} network The name of the Fediverse network.
 * @returns A list of instance URLs the user has configured, or a default list if none are available.
 */
function getInstanceList(network) {
    // TODO: replace instanceLists with local storage query
    let instanceLists = {}
    if (network in instanceLists) {
        return instanceLists[network];
    } else if (network in DEFAULT_LISTS) {
        return DEFAULT_LISTS[network];
    }
    return [];
}

// TODO: implement if we have time
// use CSS variables
function updateTheme() {

}