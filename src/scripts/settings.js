const DEFAULT_LISTS = {
    mastodon:['https://mastodon.social', 'https://fosstodon.org'],
    lemmy:['https://lemmy.ml']
}

const INST_LISTS = 'instanceLists';

/**
 * Wrapper function for local storage object conversion.
 * @precondition obj_str must either be a valid JSON string or null.
 * This shouldn't be a problem unless local storage is corrupted.
 * @param {string | null} obj_str 
 * @returns {object} JSON parsed object string, or an empty object if null
 */
function to_obj(obj_str) {
    return (obj_str) === null? {} : JSON.parse(obj_str)
}

/**
 * @param {string} network The name of the network (e.g. 'mastodon' or 'lemmy')
 * @param {*} url The URL of the instance to add.
 */
function addInstance(network, url) {
    // TODO: move call out of this function? (may separate concerns better)
    if (!validInstance(network, url)) {
        return;
    }
    let instanceList = to_obj(localStorage.getItem(INST_LISTS));
    if (network in instanceList) {
        instanceList[network].push(url);
    } else {
        instanceList[network] = [...DEFAULT_LISTS[network]].append(url);
    }
    localStorage.setItem(INST_LISTS, JSON.stringify(instanceList));
}

/**
 * Removes an instance from localStorage. Currently O(n) with respect to number of instances.
 * @param {*} network 
 * @param {*} url 
 */
function removeInstance(network, url) {

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

/**
 * 
 * @param {string} network 
 */
function resetInstanceList(network) {
    
}

// useful for fetching stuff/algorithm, read from local storage
// also for loading settings page
// if localstorage empty return default instance list?
/**
 * 
 * @param {string} network The name of the Fediverse network.
 * @returns {Array} A list of instance URLs the user has configured, or a default list if none are available,
 * or an empty list if the network name is invalid (should never happen due to verifyInstance)
 */

// TODO: design decision -- fetch localStorage every time?
function getInstanceList(network) {
    let instanceLists = to_obj(localStorage.getItem(INST_LISTS));

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