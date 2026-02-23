'use strict';

const siteData = require('./sites-data.js');

function generateSitePages() {
    siteData.forEach(site => {
        const pageContent = createPageContent(site);
        const filePath = `./${site.name}.html`;
        saveToFile(filePath, pageContent);
    });
}

function createPageContent(site) {
    return `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>${site.title}</title>\n</head>\n<body>\n    <h1>${site.heading}</h1>\n    <p>${site.description}</p>\n    <footer>\n        <p>© ${new Date().getFullYear()} ${site.footerText}</p>\n    </footer>\n</body>\n</html>`;
}

function saveToFile(filePath, content) {
    const fs = require('fs');
    fs.writeFileSync(filePath, content);
}

generateSitePages();