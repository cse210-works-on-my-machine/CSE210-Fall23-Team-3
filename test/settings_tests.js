import { describe, it } from 'node:test';
import * as assert from 'assert';
import * as settings from '../src/scripts/settings.js';

// Mock localStorage
let mockStorage = {
    store: {},
    getItem(key) {
        return this.store[key];
    },
    setItem(key, value) {
        this.store[key] = value.toString();
    },
    clear() {
        this.store = {};
    }
};

mockStorage.setItem('foo', 'bar');
describe('Fetching instance lists', () => {
    it('Should return default lists', () => {
        let lists = settings.fetchInstanceLists(mockStorage);
        for (let [network, list] of Object.entries(lists)) {
            list.forEach(url => assert.ok(settings.DEFAULT_LISTS[network].includes(url)));
        }
    })
});