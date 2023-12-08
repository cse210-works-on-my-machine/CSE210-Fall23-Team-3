export const DEFAULT_LISTS = {
    mastodon:['https://mastodon.social', 'https://fosstodon.org'],
    lemmy:['https://lemmy.ml']
}

const INST_LISTS = 'instanceLists';

/**
 * Loads hardcoded default instance lists into localStorage.
 */
function setDefaultLists(storage = localStorage) {
    saveLists(DEFAULT_LISTS, storage);
}

/**
 * Fetches current instance lists from localStorage. If there aren't any in localStorage,
 * sets them to the hardcoded defaults before returning them.
 * @returns The current set of instance lists, as an object of arrays indexed by network name.
 */
export function fetchInstanceLists(storage = localStorage) {
    if (storage.getItem(INST_LISTS) === null) {
        setDefaultLists(storage);
        // can return DEFAULT_LISTS as a fallback against localStorage not working
        // but is that even necessary?
    }
    return JSON.parse(storage.getItem(INST_LISTS));
}

function saveLists(instanceLists, storage) {
    storage.setItem(INST_LISTS, JSON.stringify(instanceLists))
}

/**
 * @param {string} network The name of the network (e.g. 'mastodon' or 'lemmy')
 * @param {*} url The URL of the instance to add.
 */
export function addInstance(network, url, storage = localStorage) {
    
    // TODO: move call out of this function? (may separate concerns better)
    if (!validInstance(network, url)) {
        return;
    }
    let instanceList = fetchInstanceLists();
    if (network in instanceList) {
        instanceList[network].push(url);
    } else {
        instanceList[network] = [url];
    }
    storage.setItem(INST_LISTS, JSON.stringify(instanceList));
}

/**
 * Removes an instance from localStorage. Currently O(n) with respect to number of instances.
 * @param {*} network 
 * @param {*} url 
 */
export function removeInstance(network, url, storage = localStorage) {
    let instanceLists = fetchInstanceLists(storage);
    console.log(instanceLists);
    if (network in instanceLists && instanceLists[network].includes(url)) {
        instanceLists[network].splice(instanceLists[network].indexOf(url),1);
        console.log(instanceLists[network]);
    }
    saveLists(instanceLists, storage);
}

// TODO: how tf is this async gonna work
/**
 * @param {string} network A string indicating the name of the network this is an instance of 
 * @param {string} url The URL to ping as a valid network instance
 * @returns {boolean} True if the instance URL is valid, False otherwise
 */
async function validInstance(network, url) {
    // TODO: refactor from branching logic
    if (network === 'mastodon') {
        // TODO: look into using instance info
        const response = await fetch(`${url}/api/v2/instance`);
        return response.status === 200;
    }
}

// TODO: implement if we have time
// use CSS variables
function updateTheme() {

}