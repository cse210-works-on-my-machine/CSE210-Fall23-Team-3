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
    const lists = settings.fetchInstanceLists(mockStorage);
    it('Should return default lists', () => {
        for (let [network, list] of Object.entries(lists)) {
            list.forEach(url => assert.ok(settings.DEFAULT_LISTS[network].includes(url)));
        }
    });
});
describe('Removing instances', () => {
    it('Don\'t remove an instance that isn\'t there', () => {
        let success = settings.removeInstance('mastodon', 'ligma', mockStorage);
        let l2 = settings.fetchInstanceLists(mockStorage);
        assert.strictEqual(success, false);
        assert.strictEqual(l2['mastodon'].length, lists['mastodon'].length);
    });
    it('Allows removal of a default instance', () => {
        let success = settings.removeInstance('mastodon', settings.DEFAULT_LISTS['mastodon'][0], mockStorage);
        let l2 = settings.fetchInstanceLists(mockStorage);
        assert.strictEqual(success, true);
        assert.strictEqual(l2['mastodon'].length, lists['mastodon'].length-1);
    });
});
describe('Adding instances', () => {
    it('Reject a URL that doesn\'t fetch', async () => {
        let before = settings.fetchInstanceLists(mockStorage);
        // ESLint says these awaits don't do anything, but they do.
        let success = await settings.addInstance('lemmy', 'https://yeet.lmao', mockStorage);
        let after = settings.fetchInstanceLists(mockStorage);
        assert.strictEqual(success, false);
        assert.strictEqual(before['lemmy'].length, after['lemmy'].length);
    });
    it('Reject a malformed URL', async () => {
        let before = settings.fetchInstanceLists(mockStorage);
        let success = await settings.addInstance('lemmy', 'skidibibopmdada', mockStorage);
        let after = settings.fetchInstanceLists(mockStorage);
        assert.strictEqual(success, false);
        assert.strictEqual(before['lemmy'].length, after['lemmy'].length);
    });
    it('Accept a good URL', async () => {
        let before = settings.fetchInstanceLists(mockStorage);
        let success = await settings.addInstance('lemmy', 'https://mtgzone.com', mockStorage);
        let after = settings.fetchInstanceLists(mockStorage);
        assert.strictEqual(success, true);
        assert.strictEqual(before['lemmy'].length+1, after['lemmy'].length);
    });
});