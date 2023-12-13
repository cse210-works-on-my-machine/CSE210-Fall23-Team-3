export class Post {
    constructor(id, content, authorName, createdAt, authorImage) {
        this.id = id;
        this.content = content;
        this.authorName = authorName; // Assuming 'author' is a simple string or object
        this.createdAt = createdAt;
        this.authorImageURL = authorImage;
    }

    static fromJSON(json) {
        return new Post(json.id, json.content, json.account.username, json.createdAt, json.account.avatar);
    }

    getDisplayDiv() {
        const postDiv = document.createElement("div");
        postDiv.className = "post";

        // Author image
        if (this.authorImageURL) {
            console.log("Image found");
            const image = document.createElement("img");
            image.src = this.authorImageURL;
            image.alt = `Image of ${this.authorName}`;
            image.className = "author-image";
            postDiv.appendChild(image);
        }
        else {
            console.log("No image found");
        }

        // Post content
        const contentParagraph = document.createElement("p");
        contentParagraph.innerHTML = this.content;
        postDiv.appendChild(contentParagraph);

        return postDiv;
    }
}
