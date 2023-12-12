export class Post extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    // Getter and Setter for id
    get id() {
        return this.getAttribute("id");
    }

    set id(value) {
        this.setAttribute("id", value);
    }

    // Getter and Setter for content
    get content() {
        return this.getAttribute("content");
    }

    set content(value) {
        this.setAttribute("content", value);
    }

    // Getter and Setter for authorName
    get authorName() {
        return this.getAttribute("author-name");
    }

    set authorName(value) {
        this.setAttribute("author-name", value);
    }

    // Getter and Setter for createdAt
    get createdAt() {
        return this.getAttribute("created-at");
    }

    set createdAt(value) {
        this.setAttribute("created-at", value);
    }

    // Getter and Setter for authorImageURL
    get authorImageURL() {
        return this.getAttribute("author-image-url");
    }

    set authorImageURL(value) {
        this.setAttribute("author-image-url", value);
    }

    // Getter and Setter for authorHandle
    get authorHandle() {
        return this.getAttribute("author-handle");
    }

    set authorHandle(value) {
        this.setAttribute("author-handle", value);
    }

    // Getter and Setter for direct-url
    get directURL() {
        return this.getAttribute("direct-url");
    }

    set directURL(value) {
        this.setAttribute("direct-url", value);
    }

    render() {
        if (this.authorImageURL == undefined) {
            this.setAttribute("author-image-url", "media/person.svg");
        }
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="src/styles/post-element.css">
            <picture>
                <img src=${this.authorImageURL}></img>
            </picture>
            <h2 class="post-header">${this.authorName}</h2>
            <a target="_blank" href=${this.directURL}><time datetime=${this.createdAt}>${(new Date(this.createdAt)).toLocaleString()}</time></a>
            <span>${this.authorHandle}</span>
            <div class="post-content">${this.content}</div>
        `;
    }
}

customElements.define("fedi-post", Post);
