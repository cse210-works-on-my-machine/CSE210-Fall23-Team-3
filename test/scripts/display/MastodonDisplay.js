import {describe, it, after, afterEach, before, beforeEach} from 'node:test';
import {JSDOM} from 'jsdom';
import * as assert from 'assert';
import { MastodonDisplay } from "../../../src/scripts/displays/MastodonDisplay.js";


const {window} = new JSDOM(`...`);
global.document = window.document;

describe('MastodonDisplay', () => {
    let mastodonDisplay;
    let container = global.document.createElement('div');
    beforeEach(() => {
        // Create a stub for the global fetch
        mastodonDisplay = new MastodonDisplay();
    });

    describe('#fetchPosts', () => {
      it('should return an array of posts', async function() {
        // Define a mock response
        const mockResponse = 
              [
                {
                    'id': 1, 'content': 'Test post', 'created_at': '2023-12-06', 
                    'account': {
                      'authr-name': 'Test user','author-image-url': 'http://example.com/avatar.jpg', 'author-handle': 'testuser' 
                    }
                },
                {
                    'id': 2, content: 'Test post', 'created_at': '2023-12-06',
                    'account': {
                      'authr-name': 'Test user2','author-image-url': 'http://example.com/avatar.jpg', 'author-handle': 'testuser' 
                    }
                },
              ];
        
        
        mastodonDisplay.displayPosts(container, mockResponse);

        const posts = container.querySelectorAll('fedi-post');
   
        assert.strictEqual(posts.length, 2);

        assert.strictEqual(posts[0].getAttribute('id'), '1');
        assert.strictEqual(posts[0].getAttribute('content'), 'Test post');
        assert.strictEqual(posts[0].getAttribute('created-at'), '2023-12-06');

        assert.strictEqual(posts[1].getAttribute('id'), '2');
        assert.strictEqual(posts[1].getAttribute('content'), 'Test post');

      });
    });
});
