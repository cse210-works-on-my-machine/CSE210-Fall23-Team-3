import {describe, it, after, afterEach, before, beforeEach} from 'node:test';
import * as assert from 'assert';
import { LemmyFetcher } from "../../../src/scripts/fetchers/LemmyFetcher.js";
import fetch from 'node-fetch';
import sinon from 'sinon';

describe('LemmyFetcher', () => {

    let fetchStub;
    let lemmyFetcher;

    beforeEach(() => {
        // Create a stub for the global fetch
        fetchStub = sinon.stub(global, 'fetch');
        lemmyFetcher = new LemmyFetcher();
    });

    describe('#fetchPosts', () => {
      it('should return an array of posts', async function() {
        // Define a mock response
        const mockResponse = {
          ok: true,
          json: async function() {
            return {
              posts: [
                {
                  post: { id: 1, published: '2023-12-06', body: 'Test post' }, // Post with only body
                  creator: { name: 'Test user', avatar: 'http://example.com/avatar.jpg', matrix_user_id: 'testuser' }
                },
                {
                    post: { id: 2, published: '2023-12-06', body: 'Test post', url: 'some-url.com' }, // Post with body and url
                    creator: { name: 'Test user2', avatar: 'http://example.com/avatar.jpg', matrix_user_id: 'testuser' }
                },
              ]
            };
          }
        };
   
        // Pass the mock response to the fetch stub
        fetchStub.resolves(mockResponse);
   
        const posts = await lemmyFetcher.fetchPosts();
   
        assert.strictEqual(posts.length, 2);
        assert.strictEqual(posts[0].post.id, 1);
        assert.strictEqual(posts[0].post.body, 'Test post');
        assert.strictEqual(posts[0].post.published, '2023-12-06');

        assert.strictEqual(posts[1].post.id, 2);
        assert.strictEqual(posts[1].post.body, 'Test post');
        assert.strictEqual(posts[1].post.url, 'some-url.com');
        
      });
    });
});
