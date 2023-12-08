import { describe, it } from 'node:test';
import * as assert from 'assert';
import * as settings from '../src/scripts/settings.js';

// Mock localStorage
let mockStorage = {
    store: {},
    getItem(key) {
        return (key in this.store)? this.store[key] : null;
    },
    setItem(key, value) {
        this.store[key] = value.toString();
    },
    clear() {
        this.store = {};
    }
};

describe('Fetching instance lists', () => {
    let lists = settings.fetchInstanceLists(mockStorage);
    it('Should return default lists', () => {
        for (let [network, list] of Object.entries(lists)) {
            list.forEach(url => assert.ok(settings.DEFAULT_LISTS[network].includes(url)));
        }
    });
    it('Allows removal of a default instance', () => {
        settings.removeInstance('mastodon', settings.DEFAULT_LISTS['mastodon'][0], mockStorage);
        let l2 = settings.fetchInstanceLists(mockStorage);
        settings.fetchInstanceLists(mockStorage); // make sure fetch is idempotent in this case
        assert.strictEqual(l2['mastodon'].length, lists['mastodon'].length-1);
    })
});