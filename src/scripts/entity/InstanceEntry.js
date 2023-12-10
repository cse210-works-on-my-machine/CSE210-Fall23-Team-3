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

    // Glorious boilerplate for tag attributes
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

    get network() {
        return this.getAttribute('network');
    }

    set network(value) {
        this.setAttribute('network', value);
    }
    // -- End of boilerplate

    render() {
        // storage is hardcoded as localStorage for now, but class could be easily adapted to suit any Storage object
        this.shadowRoot.innerHTML = `
        <script>
            import { removeInstance } from "src/scripts/settings.js";

            document.getElementById('instance-removal-button').addEventListener('click', () => removeInstance(${this.network}, ${this.url}));
        </script>
        <link rel="stylesheet" href="src/styles/instance-entry.css">
        <link rel="stylesheet" href="src/styles/common.css">
        <li>
            <span>${this.url}</span>
            <button id="instance-removal-button">
                <img src="media/minus.svg" class="icon-small"></img>
            </button>
        </li>
        `;
    }
}

customElements.define('inst-entry', InstanceEntry);
