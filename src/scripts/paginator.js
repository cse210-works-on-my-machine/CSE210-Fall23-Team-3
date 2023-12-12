import { Post } from "./entity/Post.js";

export class Paginator {
    /**
     *
     * @param {Array<Post>} items - The array of items to paginate
     * @param {number} itemsPerPage - The number of items per page
     */
    constructor(items, itemsPerPage) {
        this.items = items;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1;
        this.displayPage();

        const nextPage = document.getElementById("next-page");
        const prevPage = document.getElementById("prev-page");
        nextPage.addEventListener("click", function () {
            this.nextPage();
        }.bind(this));

        prevPage.addEventListener("click", function () {
            this.prevPage();
        }.bind(this));
    }

    /**
     *
     * Display the page of items
     */
    displayPage() {
        // Scroll to top of page once displayed
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Clear the container
        document.getElementById("featuredTagsPosts").innerHTML = "";

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;

        // Display the items for the current page
        const posts = this.items.slice(startIndex, endIndex);
        posts.forEach((post) => {
            document.getElementById("featuredTagsPosts").appendChild(post);
        });

        // Update the page number
        document.getElementById("page-label").innerHTML = "Page " + this.currentPage;
    }

    /**
     * Set the current page to the next page and display it
     */
    nextPage() {
        this.currentPage++;
        this.displayPage();
    }

    /**
     * Set the current page to the previous page and display it. If current page is 1, do nothing.
     */
    prevPage() {
        if (this.currentPage === 1) return;
        this.currentPage--;
        this.displayPage();
    }
}
