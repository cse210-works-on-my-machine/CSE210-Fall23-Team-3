import {describe, it, after, afterEach, before, beforeEach} from 'node:test';
import {JSDOM} from 'jsdom';
import * as assert from 'assert';
import { LemmyDisplay } from "../../../src/scripts/displays/LemmyDisplay.js";

const {window} = new JSDOM(`...`);
global.document = window.document;

describe('LemmyDisplay', () => {
    let lemmyDisplay;
    let container = global.document.createElement('div');
    beforeEach(() => {
        // Create a stub for the global fetch
        lemmyDisplay = new LemmyDisplay();
    });

    describe('#fetchPosts', () => {
      it('should return an array of posts', async function() {
        // Define a mock response
        const mockResponse = 
              [
                {
                  post: { id: 1, published: '2023-12-06', body: 'Test post' }, // Post with only body
                  creator: { name: 'Test user', avatar: 'http://example.com/avatar.jpg', matrix_user_id: 'testuser' }
                },
                {
                    post: { id: 1, published: '2023-12-06', body: 'Test post', url: 'some-url.com' }, // Post with body and url
                    creator: { name: 'Test user2', avatar: 'http://example.com/avatar.jpg', matrix_user_id: 'testuser' }
                },
              ];
        
        
        lemmyDisplay.displayPosts(container, mockResponse);

        const posts = container.querySelectorAll('fedi-post');
   
        assert.strictEqual(posts.length, 2);
        assert.strictEqual(posts[0].getAttribute('id'), '1');

        // First post with only body
        assert.strictEqual(posts[0].getAttribute('content'), 'Test post');
        assert.strictEqual(posts[0].getAttribute('author-name'), 'Test user');
        assert.strictEqual(posts[0].getAttribute('created-at'), '2023-12-06');
        assert.strictEqual(posts[0].getAttribute('author-image-url'), 'http://example.com/avatar.jpg');
        assert.strictEqual(posts[0].getAttribute('author-handle'), 'testuser');

        // Second post with body and url
        assert.strictEqual(posts[1].getAttribute('content'), 'Test post\nURL: some-url.com');
        assert.strictEqual(posts[1].getAttribute('author-name'), 'Test user2');
      });
    });
});
