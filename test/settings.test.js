import { describe, it } from "node:test";
import * as assert from "assert";
import * as instanceList from "../src/scripts/instanceList.js";

// Mock localStorage
let mockStorage = {
    store: {},
    getItem(key) {
        return (key in this.store) ? this.store[key] : null;
    },
    setItem(key, value) {
        this.store[key] = value.toString();
    },
    clear() {
        this.store = {};
    },
};
const lists = instanceList.fetchInstanceLists(mockStorage);
describe("Fetching instance lists", () => {
    it("Should return default lists", () => {
        for (let [network, list] of Object.entries(lists)) {
            list.forEach(url => assert.ok(instanceList.DEFAULT_LISTS[network].includes(url)));
        }
    });
});
describe("Removing instances", () => {
    it("Don't remove an instance that isn't there", () => {
        let ind = instanceList.removeInstance("mastodon", "ligma", mockStorage);
        let l2 = instanceList.fetchInstanceLists(mockStorage);
        assert.strictEqual(ind, -1);
        assert.strictEqual(l2["mastodon"].length, lists["mastodon"].length);
    });
    it("Allows removal of a default instance", () => {
        let ind = instanceList.removeInstance("mastodon", instanceList.DEFAULT_LISTS["mastodon"][0], mockStorage);
        let l2 = instanceList.fetchInstanceLists(mockStorage);
        assert.strictEqual(ind, 0);
        assert.strictEqual(l2["mastodon"].length, lists["mastodon"].length - 1);
    });
});
describe("Adding instances", () => {
    // Commented out for now because fetch check in practice causes CORS errors if not directly on the API
    // it('Reject a URL that doesn\'t fetch', async () => {
    //     let before = settings.fetchInstanceLists(mockStorage);
    //     // ESLint says these awaits don't do anything, but they do.
    //     let success = await settings.addInstance('lemmy', 'https://yeet.lmao', mockStorage);
    //     let after = settings.fetchInstanceLists(mockStorage);
    //     assert.strictEqual(success, false);
    //     assert.strictEqual(before['lemmy'].length, after['lemmy'].length);
    // });
    it("Reject a malformed URL", async () => {
        let before = instanceList.fetchInstanceLists(mockStorage);
        let success = await instanceList.addInstance("lemmy", "skidibibopmdada", mockStorage);
        let after = instanceList.fetchInstanceLists(mockStorage);
        assert.strictEqual(success, false);
        assert.strictEqual(before["lemmy"].length, after["lemmy"].length);
    });
    it("Accept a good URL", async () => {
        let before = instanceList.fetchInstanceLists(mockStorage);
        let success = await instanceList.addInstance("lemmy", "https://mtgzone.com", mockStorage);
        let after = instanceList.fetchInstanceLists(mockStorage);
        assert.strictEqual(success, true);
        assert.strictEqual(before["lemmy"].length + 1, after["lemmy"].length);
    });
});
