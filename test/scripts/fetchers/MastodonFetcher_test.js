import {describe, it, after, afterEach, before, beforeEach} from 'node:test';
import {JSDOM} from 'jsdom';
import * as assert from 'assert';
import {test} from 'node:test';
import { MastodonFetcher, TAGS_SUFFIX, POST_SUFFIX } from "../../../src/scripts/fetchers/MastodonFetcher.js";
import fetch from 'node-fetch';
import sinon from 'sinon';
import * as Constant from "../../../src/scripts/entity/Constant.js";

const FAKE_URL = 'fakeTrendingURL';
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

        // Mock trending tags response
        fetchStub.withArgs(FAKE_URL + TAGS_SUFFIX).resolves(Promise.resolve(new Response(JSON.stringify([
          {'name': 'tag1'}, 
          {'name': 'tag2'}
         ]), { status: 200 })));
        
         const mockResponse = {
          ok: true,
          json: async function() {
              return [
                  {
                      'id': 1, 
                      'content': 'Test post', 
                      'created_at': '2023-12-06', 
                      'author-name': 'Test user',
                      'author-image-url': 'http://example.com/avatar.jpg', 
                      'author-handle': 'testuser' 
                  }
              ];
          }
      };

        // Mock trending post response for each tag
        fetchStub.withArgs(FAKE_URL + POST_SUFFIX + 'tag1').resolves(mockResponse);
        fetchStub.withArgs(FAKE_URL + POST_SUFFIX + 'tag2').resolves(mockResponse);
   
        const posts = await mastodonFetcher.fetchPosts(FAKE_URL);
        
        assert.strictEqual(posts.length, 2);

      });
    });
});