import { describe, it, beforeEach } from "node:test";
import { JSDOM } from "jsdom";
import * as assert from "assert";
import { MastodonPostBuilder } from "../../../src/scripts/postBuilder/MastodonPostBuilder.js";

const { window } = new JSDOM("...");
global.document = window.document;

describe("MastodonPostBuilder", () => {
    let mastodonPostBuilder;
    beforeEach(() => {
        mastodonPostBuilder = new MastodonPostBuilder();
    });

    describe("#buildPost", () => {
        it("should return a Post element", async function () {
        // Define a mock response
            const mockResponse
                = {
                    id: 1, content: "Test post", created_at: "2023-12-06",
                    account: {
                        "authr-name": "Test user", "author-image-url": "http://example.com/avatar.jpg", "author-handle": "testuser",
                    },
                }
              ;

            const post = mastodonPostBuilder.buildPost(mockResponse);

            assert.strictEqual(post.getAttribute("id"), "1");
            assert.strictEqual(post.getAttribute("content"), "Test post");
            assert.strictEqual(post.getAttribute("created-at"), "2023-12-06");
        });
    });
});
