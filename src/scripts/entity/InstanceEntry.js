/**
 * Custom element class for representing a listed instance on the settings page.
 * @attribute url
 * @attribute network
 */
export class InstanceEntry extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    // Glorious boilerplate for tag attributes
    get id() {
        return this.getAttribute("id");
    }

    set id(value) {
        this.setAttribute("id", value);
    }

    get url() {
        return this.getAttribute("url");
    }

    set url(value) {
        this.setAttribute("url", value);
    }

    get network() {
        return this.getAttribute("network");
    }

    set network(value) {
        this.setAttribute("network", value);
    }
    // -- End of boilerplate

    render() {
        // storage is hardcoded as localStorage for now, but class could be easily adapted to suit any Storage object by adding a parameter to removeInstance
        this.shadowRoot.innerHTML = `
        
        <link rel="stylesheet" href="src/styles/instance-entry.css">
        <link rel="stylesheet" href="src/styles/common.css">
        <li>
            <span>${this.url}</span>
            <button id="instance-removal-button" onclick="handleRemoveInstance('${this.network}', '${this.url}')">
                <img src="media/minus.svg" class="icon-small"></img>
            </button>
        </li>
        `;
        const script = document.createElement("script");
        script.type = "module";
        script.textContent = `
        import { handleRemoveInstance } from './src/scripts/instanceList.js';
        window.handleRemoveInstance = handleRemoveInstance;
        `;
        this.shadowRoot.appendChild(script);
    }
}

customElements.define("inst-entry", InstanceEntry);
