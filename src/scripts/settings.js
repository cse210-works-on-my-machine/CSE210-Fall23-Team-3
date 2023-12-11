import "./entity/InstanceEntry.js"
import { InstanceEntry } from "./entity/InstanceEntry.js";
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
function saveLists(instanceLists, storage=localStorage) {
    storage.setItem(INST_LISTS, JSON.stringify(instanceLists))
}

/**
 * @param {string} network The name of the network (e.g. 'mastodon' or 'lemmy')
 * @param {string} url The URL of the instance to add.
 * @returns {Promise<boolean>} Promise which resolves to True if the instance addition was successful, False otherwise
 */
export async function addInstance(network, url, storage = localStorage) {
    // TODO: move validation out of this function? (may separate concerns better)
    if (!(ALLOWED_NETWORKS.has(network)) || !validUrl(url)) return false;
    // Commented out because this creates CORS errors if not done exactly on API
    // try {
    //     let response = await fetch(url);
    //     if (response.status !== 200) return false;
    // } catch (_) {
    //     return false;
    // }
    
    let instanceList = fetchInstanceLists(storage);
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
    let i = removeInstance(network, url, storage);
    if (i !== -1) {
        let list = document.getElementById(`${network}-instance-list`);
        // first child will always be add instance input box
        // index 0 of instance list will be child 1
        list.removeChild(list.children[i+1]);
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
    let instanceLists = fetchInstanceLists(storage);
    if (network in instanceLists && instanceLists[network].includes(url)) {
        let ind = instanceLists[network].indexOf(url);
        instanceLists[network].splice(ind,1);
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
    } catch {
        return false;
    }
}
// Populate instance lists onto UI
let instLists = fetchInstanceLists();
for (let network of ALLOWED_NETWORKS) {
    let parent = document.getElementById(`${network}-instance-list`);
    let listBottom = parent.querySelector('.instances-reset-button');
    // not iterating
    instLists[network].forEach(url => {
        let newEntry = new InstanceEntry();
        newEntry.network = network;
        newEntry.url = url;
        parent.insertBefore(newEntry, listBottom);
    });
}

// Add event listners for add instance buttons.
// Remove instance buttons handled by InstanceEntry.js
let addInstBtns = Array.from(document.getElementsByClassName('add-instance-btn'));
addInstBtns.forEach(element => {
    element.addEventListener('click', async event => {
        let btn = event.currentTarget;
        let network = btn.getAttribute('data-network');
        let input = document.getElementById(`${network}-add-instance`);
        let url = input.value;
        let success = await addInstance(network, input.value);
        if (success) {
            let newEntry = new InstanceEntry();
            newEntry.network = network;
            newEntry.url = url;
            let list = document.getElementById(`${network}-instance-list`);
            list.insertBefore(newEntry, list.children[1]);
            input.value = ''; // clear input box after adding to UI
        } else {
            // TODO: don't use an alert
            alert('Adding instance failed, please try again');
        }
    });
});

// Add event listeners for "reset to default"
// TODO: refactor classes to "button" or "btn". choose one
let resetDefaultBtns = Array.from(document.getElementsByClassName('instances-reset-button'));
resetDefaultBtns.forEach(element => {
    element.addEventListener('click', event => {
        let network = event.currentTarget.getAttribute('data-network');
        let instanceLists = fetchInstanceLists();
        instanceLists[network] = DEFAULT_LISTS[network];
        saveLists(instanceLists);
        location.reload();
    });
});