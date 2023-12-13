import { describe, it, beforeEach } from "node:test";
import * as assert from "assert";
import { MastodonFetcher, TAGS_SUFFIX, POST_SUFFIX, NUM_MASTODON_POSTS } from "../../../src/scripts/fetchers/MastodonFetcher.js";
import sinon from "sinon";

const FAKE_URL = "fakeTrendingURL";
describe("MastodonFetcher", () => {
    let fetchStub;
    let mastodonFetcher;

    beforeEach(() => {
        // Create a stub for the global fetch
        fetchStub = sinon.stub(global, "fetch");
        mastodonFetcher = new MastodonFetcher();
    });

    describe("#fetchPosts", () => {
        it("should return an array of posts", async function () {
            // Mock trending tags response
            fetchStub.withArgs(FAKE_URL + TAGS_SUFFIX).resolves(Promise.resolve(new Response(JSON.stringify([
                { name: "tag1" },
                { name: "tag2" },
            ]), { status: 200 })));

            const mockResponse = {
                ok: true,
                json: async function () {
                    return [
                        {
                            "id": 1,
                            "content": "Test post",
                            "created_at": "2023-12-06",
                            "author-name": "Test user",
                            "author-image-url": "http://example.com/avatar.jpg",
                            "author-handle": "testuser",
                        },
                    ];
                },
            };

            // Mock trending post response for each tag
            fetchStub.withArgs(FAKE_URL + POST_SUFFIX + "tag1" + "?limit=" + NUM_MASTODON_POSTS).resolves(mockResponse);
            fetchStub.withArgs(FAKE_URL + POST_SUFFIX + "tag2" + "?limit=" + NUM_MASTODON_POSTS).resolves(mockResponse);

            const posts = await mastodonFetcher.fetchPosts(FAKE_URL);

            assert.strictEqual(posts.length, 4);
        });
    });
});
