import {describe, it, after, afterEach, before, beforeEach} from 'node:test';
import {JSDOM} from 'jsdom';
import * as assert from 'assert';
import { LemmyPostBuilder } from "../../../src/scripts/postBuilder/LemmyPostBuilder.js";

const { window } = await new JSDOM(`...`);
global.document = window.document;

describe('LemmyPostBuidler', () => {
    let lemmyPostBuilderImport;
    let lemmyPostBuilder

    beforeEach(async () => {
  
      // Dynamically import LemmyPostBuilder after the DOM is set up
      lemmyPostBuilder = new LemmyPostBuilder();
    });

    describe('#buildPost', () => {
      it('should return a Post element with content when a raw post with only body', async function() {
        // Define a mock response
        const mockData = 
                {
                  post: { id: 1, published: '2023-12-06', body: 'Test post' }, // Post with only body
                  creator: { name: 'Test user', avatar: 'http://example.com/avatar.jpg', matrix_user_id: 'testuser' }
                };
        
        
        const post = lemmyPostBuilder.buildPost(mockData);

        assert.strictEqual(post.getAttribute('id'), '1');

        // First post with only body
        assert.strictEqual(post.getAttribute('content'), 'Test post');
        assert.strictEqual(post.getAttribute('author-name'), 'Test user');
        assert.strictEqual(post.getAttribute('created-at'), '2023-12-06');
        assert.strictEqual(post.getAttribute('author-image-url'), 'http://example.com/avatar.jpg');
        assert.strictEqual(post.getAttribute('author-handle'), 'testuser');

      });
    });
});
