/**
 * Custom element class for representing a listed instance on the settings page.
 * @attribute url
 * @attribute network
 */
export class InstanceEntry extends HTMLElement {
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

    get url() {
        return this.getAttribute('url');
    }
    
    set url(value) {
        this.setAttribute('url', value);
    }

    render() {
        // storage is hardcoded as localStorage for now, but class could be easily
        // adapted to suit any Storage object
        this.shadowRoot.innerHTML = `
        <li class="instance-list-item">${this.url}</li>
        <button onclick="removeInstance(${this.network}, ${this.url}, localStorage)>
            <img src="media/minus.svg" class="icon-small"></img>
        </button>
        `;
    }
}

customElements.define('inst-entry', InstanceEntry);
