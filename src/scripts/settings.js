export const DEFAULT_LISTS = {
    mastodon:['https://mastodon.social', 'https://fosstodon.org'],
    lemmy:['https://lemmy.ml']
}

const INST_LISTS = 'instanceLists';
const ALLOWED_NETWORKS = new Set(['mastodon', 'lemmy']);

/**
 * Loads hardcoded default instance lists into localStorage.
 * @param {Storage} storage The storage object to reset to default.
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

/**
 * Takes an object, stringifies it and stores it in storage.
 * @param {Object} instanceLists An object, should be pairs of network names and URL string arrays
 * @param {*} storage The storage object to write to with the key 'instanceLists'
 */
function saveLists(instanceLists, storage) {
    storage.setItem(INST_LISTS, JSON.stringify(instanceLists))
}

/**
 * @param {string} network The name of the network (e.g. 'mastodon' or 'lemmy')
 * @param {*} url The URL of the instance to add.
 * @returns {boolean} True if the instance addition was successful, False otherwise
 */
export async function addInstance(network, url, storage = localStorage) {
    // TODO: move validation out of this function? (may separate concerns better)
    if (!(ALLOWED_NETWORKS.has(network)) || !validUrl(url)) return false;
    try {
        let response = await fetch(url);
        if (response.status !== 200) return false;
    } catch (_) {
        return false;
    }
    
    let instanceList = fetchInstanceLists(storage);
    // Add URL to existing list or create new one if necessary
    if (network in instanceList) {
        instanceList[network].push(url);
    } else {
        instanceList[network] = [url];
    }
    console.log(instanceList[network])
    storage.setItem(INST_LISTS, JSON.stringify(instanceList));
    return true;
}

/**
 * Removes an instance from localStorage. Currently O(n) with respect to number of instances.
 * @param {*} network 
 * @param {*} url 
 */
export function removeInstance(network, url, storage = localStorage) {
    let instanceLists = fetchInstanceLists(storage);
    if (network in instanceLists && instanceLists[network].includes(url)) {
        instanceLists[network].splice(instanceLists[network].indexOf(url),1);
    }
    saveLists(instanceLists, storage);
}

/**
 * @param {string} url A URL string to validate
 * @returns {boolean} true if the URL string is valid, false otherwise
 */
function validUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// TODO: implement if we have time
// use CSS variables
function updateTheme() {

}