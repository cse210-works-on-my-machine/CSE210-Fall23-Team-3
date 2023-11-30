export class Post extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    // Getter and Setter for id
    get id() {
        return this.getAttribute('id');
    }

    set id(value) {
        this.setAttribute('id', value);
    }

    // Getter and Setter for content
    get content() {
        return this.getAttribute('content');
    }

    set content(value) {
        this.setAttribute('content', value);
    }

    // Getter and Setter for authorName
    get authorName() {
        return this.getAttribute('author-name');
    }

    set authorName(value) {
        this.setAttribute('author-name', value);
    }

    // Getter and Setter for createdAt
    get createdAt() {
        return this.getAttribute('created-at');
    }

    set createdAt(value) {
        this.setAttribute('created-at', value);
    }

    // Getter and Setter for authorImageURL
    get authorImageURL() {
        return this.getAttribute('author-image-url');
    }

    set authorImageURL(value) {
        this.setAttribute('author-image-url', value);
    }

    // Getter and Setter for authorHandle
    get authorHandle() {
        return this.getAttribute('author-handle');
    }

    set authorHandle(value) {
        this.setAttribute('author-handle', value);
    }


    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    width: 80%;
                    display: grid;
                    grid-template-columns: auto 1fr;
                    grid-template-rows: max-content max-content max-content;
                    gap: 1em;
                    padding-bottom: 1em;
                    padding-top: 1em;
                }

                .post-header {
                    display: flex;
                    align-items: center
                }
                
                picture {
                    width: max-content;
                    height: max-content;
                }

                picture img{
                    width: 100px;
                    height: 100px;
                    border: inset;
                }

                .post-content {
                    grid-column: span 2;
                }

            </style>
            <picture>
                <img src=${this.authorImageURL}></img>
            </picture>
            <h2 class="post-header">${this.authorName}</h2>
            <time>${this.createdAt}</time> <span>${this.authorHandle}</span>
            <div class="post-content">${this.content}</div>
        `;
    }
}

customElements.define('fedi-post', Post);
