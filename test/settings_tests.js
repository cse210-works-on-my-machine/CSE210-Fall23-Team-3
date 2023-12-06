const { describe, it } = require('node:test');
const assert = require('assert');
import '../src/scripts/settings.js';

describe('Fetching instance lists', () => {
    it('Should return default lists', () => {
        let lists = fetchInstanceLists();
        for (const [network, list] of lists) {
            list.forEach(url => assert(url in DEFAULT_LISTS[network]));
        }
    })
});