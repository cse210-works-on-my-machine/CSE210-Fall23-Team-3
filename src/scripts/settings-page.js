/**
 * Script that runs on page load for settings.html
 */

import { InstanceEntry } from "./entity/InstanceEntry.js";
import { fetchInstanceLists, saveLists, addInstance, DEFAULT_LISTS } from "./instanceList.js";

// Populate instance lists onto UI
let instLists = fetchInstanceLists();
for (let [network, list] of Object.entries(instLists)) {
    let parent = document.getElementById(`${network}-instance-list`);
    let listBottom = parent.querySelector(".instances-reset-button");
    list.forEach((url) => {
        let newEntry = new InstanceEntry();
        newEntry.network = network;
        newEntry.url = url;
        parent.insertBefore(newEntry, listBottom);
    });
}

// Add event listners for add instance buttons.
// Remove instance buttons handled by InstanceEntry.js
let addInstBtns = Array.from(document.getElementsByClassName("add-instance-btn"));
addInstBtns.forEach((element) => {
    // event handler is async depending on whether or not we re-add instance validation via fetch
    element.addEventListener("click", async (event) => {
        let btn = event.currentTarget;
        let network = btn.getAttribute("data-network");
        let input = document.getElementById(`${network}-add-instance`);
        let url = input.value;
        // add https:// if the user forgot
        if (!(url.includes("//"))) {
            url = "https://".concat(url);
        }
        let success = await addInstance(network, url);
        if (success) {
            let newEntry = new InstanceEntry();
            newEntry.network = network;
            newEntry.url = url;
            let list = document.getElementById(`${network}-instance-list`);
            list.insertBefore(newEntry, list.children[1]);
            input.value = ""; // clear input box after adding to UI
        }
        else {
            alert("Adding instance failed, please try again");
        }
    });
});

// Add event listeners for "reset to default"
let resetDefaultBtns = Array.from(document.getElementsByClassName("instances-reset-button"));
resetDefaultBtns.forEach((element) => {
    element.addEventListener("click", (event) => {
        let network = event.currentTarget.getAttribute("data-network");
        let instanceLists = fetchInstanceLists();
        instanceLists[network] = DEFAULT_LISTS[network];
        saveLists(instanceLists);
        location.reload();
    });
});
