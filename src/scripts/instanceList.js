export const DEFAULT_LISTS = {
    mastodon: ["https://mastodon.social", "https://fosstodon.org", "https://mstdn.social", "https://mastodon.online", "https://mastodon.world"],
    lemmy: ["https://lemmy.ml", "https://lemmy.world", "https://lemm.ee"],
};

const INST_LISTS = "instanceLists";
const ALLOWED_NETWORKS = new Set(["mastodon", "lemmy"]);

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
export function saveLists(instanceLists, storage = localStorage) {
    storage.setItem(INST_LISTS, JSON.stringify(instanceLists));
}

/**
 * @param {string} network The name of the network (e.g. 'mastodon' or 'lemmy')
 * @param {string} url The URL of the instance to add.
 * @returns {Promise<boolean>} Promise which resolves to True if the instance addition was successful, False otherwise
 */
export async function addInstance(network, url, storage = localStorage) {
    if (!(ALLOWED_NETWORKS.has(network)) || !validUrl(url)) return false;

    const instanceList = fetchInstanceLists(storage);
    // network is already guaranteed to be in ALLOWED_NETWORKS and thus on the default list
    instanceList[network].unshift(url);
    storage.setItem(INST_LISTS, JSON.stringify(instanceList));
    return true;
}

/**
 * Calls removeInstance -- if it's successful, remove corresponding element from UI.
 * @param {string} network
 * @param {string} url
 * @param {Storage} storage
 */
export function handleRemoveInstance(network, url, storage = localStorage) {
    const i = removeInstance(network, url, storage);
    if (i !== -1) {
        const list = document.getElementById(`${network}-instance-list`);
        // first child will always be add instance input box
        // index 0 of instance list will be child 1
        list.removeChild(list.children[i + 1]);
    }
}
/**
 * Removes an instance from localStorage. Currently O(n) with respect to number of instances.
 * @param {string} network
 * @param {string} url
 * @param {Storage} storage
 * @returns {number} Index removed if successful, -1 otherwise
 */
export function removeInstance(network, url, storage = localStorage) {
    const instanceLists = fetchInstanceLists(storage);
    if (network in instanceLists && instanceLists[network].includes(url)) {
        const ind = instanceLists[network].indexOf(url);
        instanceLists[network].splice(ind, 1);
        saveLists(instanceLists, storage);
        return ind;
    }
    return -1;
}

/**
 * @param {string} url A URL string to validate
 * @returns {boolean} true if the URL string is valid, false otherwise
 */
function validUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch {
        return false;
    }
}
