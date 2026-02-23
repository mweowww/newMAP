// sites/site-loader.js

class SiteLoader {
    constructor() {
        this.cache = new Map();
    }

    load(url) {
        const params = this.getUrlParameters(url);
        const siteId = params.id;

        if (this.cache.has(siteId)) {
            this.renderSiteDetails(this.cache.get(siteId));
        } else {
            fetch(`/api/sites/${siteId}`)
                .then(response => response.json())
                .then(data => {
                    this.cache.set(siteId, data);
                    this.renderSiteDetails(data);
                })
                .catch(err => console.error('Error loading site details:', err));
        }
    }

    getUrlParameters(url) {
        const queryString = url.split('?')[1];
        const params = {};
        if (queryString) {
            queryString.split('&').forEach(param => {
                const [key, value] = param.split('=');
                params[decodeURIComponent(key)] = decodeURIComponent(value);
            });
        }
        return params;
    }

    renderSiteDetails(siteData) {
        const container = document.getElementById('site-details');
        container.innerHTML = `
            <h1>${siteData.title}</h1>
            <div>${siteData.description}</div>
        `;
        // Additional rendering logic here if needed
    }

    navigate(url) {
        history.pushState(null, '', url);
        this.load(url);
    }

    init() {
        window.onpopstate = () => this.load(window.location.href);
        document.addEventListener('click', (event) => {
            if (event.target.matches('a[data-navigate]')) {
                event.preventDefault();
                this.navigate(event.target.href);
            }
        });
    }
}

const siteLoader = new SiteLoader();
siteLoader.init();
