import {describe, it, after, afterEach, before, beforeEach} from 'node:test';
import {JSDOM} from 'jsdom';
import * as assert from 'assert';
import {test} from 'node:test';
import { MastodonFetcher } from "../../../src/scripts/fetchers/MastodonFetcher.js";
import fetch from 'node-fetch';
import sinon from 'sinon';
import * as Constant from "../../../src/scripts/entity/Constant.js";

describe('MastodonFetcher', () => {

    let fetchStub;
    let mastodonFetcher;

    beforeEach(() => {
        // Create a stub for the global fetch
        fetchStub = sinon.stub(global, 'fetch');
        mastodonFetcher = new MastodonFetcher();
    });

    describe('#fetchPosts', () => {
      it('should return an array of posts', async function() {

        fetchStub.withArgs(Constant.MASTODON_SOCIAL_TRENDING_TAGS).returns(Promise.resolve(new Response(JSON.stringify([
          {'name': 'tag1'}, 
          {'name': 'tag2'}
         ]), { status: 200 })));
         


        // Define a mock response
        const mockResponse = {
          ok: true,
          json: async function() {
            return {
              posts: [
                {
                    'id': 1, content: 'Test post', 'created_at': '2023-12-06', 'authr-name': 'Test user','author-image-url': 'http://example.com/avatar.jpg', 'author-handle': 'testuser' 
                }
              ]
            };
          }
        };

        fetchStub.withArgs(Constant.MASTODON_SOCIAL_TRENDING_POST_PER_TAG + 'tag1').resolves(mockResponse);
        fetchStub.withArgs(Constant.MASTODON_SOCIAL_TRENDING_POST_PER_TAG + 'tag2').resolves(mockResponse);
   
        // Pass the mock response to the fetch stub
        fetchStub.resolves(mockResponse);
   
        const posts =  await mastodonFetcher.fetchPosts();

        assert.strictEqual(posts.length, 1);


      });
    });
});