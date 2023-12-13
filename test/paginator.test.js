import { describe, it, beforeEach } from "node:test";
import { JSDOM } from "jsdom";
import * as assert from "assert";

describe("Paginator", () => {
    let paginatorImport;
    let paginator;
    const mockPosts = [
        {
            id: "1",
            content: "This is the first post",
            authorName: "John Doe",
            createdAt: "2023-12-09",
            authorImageURL: "https://example.com/avatar1.jpg",
            authorHandle: "@johndoe",
        },
        {
            id: "2",
            content: "This is the second post",
            authorName: "Jane Doe",
            createdAt: "2023-12-09",
            authorImageURL: "https://example.com/avatar2.jpg",
            authorHandle: "@janedoe",
        },
        {
            id: "3",
            content: "This is the third post",
            authorName: "Alex Smith",
            createdAt: "2023-12-09",
            authorImageURL: "https://example.com/avatar3.jpg",
            authorHandle: "@alexsmith",
        },
    ];

    let dom;
    let pageLabel;

    beforeEach(() => {
        dom = new JSDOM("<!doctype html><html><body><div id=\"featuredTagsPosts\"></div><footer><button class=\"page-button\" id=\"prev-page\" type=\"button\"></button><span class=\"page-label\" id=\"page-label\">Page 2</span><button class=\"page-button\" id=\"next-page\" type=\"button\"></button></footer> </body></html>", {
            url: "http://localhost",
        });
        global.document = dom.window.document;
        global.window = dom.window;

        // Node 21 forces it to be assigned like this for some reason.
        Object.assign(globalThis, dom.window.navigator);

        global.HTMLElement = dom.window.HTMLElement;
        global.customElements = dom.window.customElements;

        pageLabel = document.getElementById("page-label");
    });

    describe("#displayPage1AtStart", () => {
        it("should display first 2 posts (page 1) at start", async function () {
            const posts = mockPosts.map((postData) => {
                const postElement = global.document.createElement("fedi-post");
                postElement.setAttribute("id", postData.id);
                postElement.setAttribute("content", postData.content);
                postElement.setAttribute("author-name", postData.authorName);
                postElement.setAttribute("created-at", postData.createdAt);
                postElement.setAttribute("author-image-url", postData.authorImageURL);
                postElement.setAttribute("author-handle", postData.authorHandle);
                return postElement;
            });

            // Import the paginator
            paginatorImport = await import("../src/scripts/paginator.js");
            paginator = new paginatorImport.Paginator(posts, 2);

            // Should display the first two posts
            let featuredTagsPosts = document.getElementById("featuredTagsPosts");
            assert.strictEqual(featuredTagsPosts.children.length, 2);
            assert.strictEqual(pageLabel.innerHTML, "Page 1 of 2");
        });
    });

    it("should display page 2 when nextPage() is called", async function () {
        const posts = mockPosts.map((postData) => {
            const postElement = global.document.createElement("fedi-post");
            postElement.setAttribute("id", postData.id);
            postElement.setAttribute("content", postData.content);
            postElement.setAttribute("author-name", postData.authorName);
            postElement.setAttribute("created-at", postData.createdAt);
            postElement.setAttribute("author-image-url", postData.authorImageURL);
            postElement.setAttribute("author-handle", postData.authorHandle);
            return postElement;
        });

        // Import the paginator
        paginatorImport = await import("../src/scripts/paginator.js");
        paginator = new paginatorImport.Paginator(posts, 2);

        // Should display the first two posts - before clicking next
        let featuredTagsPosts = document.getElementById("featuredTagsPosts");
        assert.strictEqual(featuredTagsPosts.children.length, 2);

        // Should display the next two posts (well actually one since length is 3)
        paginator.nextPage();
        assert.strictEqual(featuredTagsPosts.children.length, 1);
        assert.strictEqual(pageLabel.innerHTML, "Page 2 of 2");
    });

    it("should stay at page 1 when prevPage() is called at page 1", async function () {
        const posts = mockPosts.map((postData) => {
            const postElement = global.document.createElement("fedi-post");
            postElement.setAttribute("id", postData.id);
            postElement.setAttribute("content", postData.content);
            postElement.setAttribute("author-name", postData.authorName);
            postElement.setAttribute("created-at", postData.createdAt);
            postElement.setAttribute("author-image-url", postData.authorImageURL);
            postElement.setAttribute("author-handle", postData.authorHandle);
            return postElement;
        });

        // Import the paginator
        paginatorImport = await import("../src/scripts/paginator.js");
        paginator = new paginatorImport.Paginator(posts, 2);

        // Should display the first two posts - before clicking next
        let featuredTagsPosts = document.getElementById("featuredTagsPosts");
        assert.strictEqual(featuredTagsPosts.children.length, 2);

        // Should stay at page 1
        paginator.prevPage();
        assert.strictEqual(featuredTagsPosts.children.length, 2);
        assert.strictEqual(pageLabel.innerHTML, "Page 1 of 2");
    });

    it("shuld display page 1 when prevPage() is called at page 2", async function () {
        const posts = mockPosts.map((postData) => {
            const postElement = global.document.createElement("fedi-post");
            postElement.setAttribute("id", postData.id);
            postElement.setAttribute("content", postData.content);
            postElement.setAttribute("author-name", postData.authorName);
            postElement.setAttribute("created-at", postData.createdAt);
            postElement.setAttribute("author-image-url", postData.authorImageURL);
            postElement.setAttribute("author-handle", postData.authorHandle);
            return postElement;
        });

        // Import the paginator
        paginatorImport = await import("../src/scripts/paginator.js");
        paginator = new paginatorImport.Paginator(posts, 2);

        // Should display the first two posts - before clicking next
        let featuredTagsPosts = document.getElementById("featuredTagsPosts");
        assert.strictEqual(featuredTagsPosts.children.length, 2);

        // Should display the next two posts (well actually one since length is 3)
        paginator.nextPage();
        assert.strictEqual(featuredTagsPosts.children.length, 1);
        assert.strictEqual(pageLabel.innerHTML, "Page 2 of 2");

        // Should display the first two posts
        paginator.prevPage();
        assert.strictEqual(featuredTagsPosts.children.length, 2);
        assert.strictEqual(pageLabel.innerHTML, "Page 1 of 2");
    });
});
