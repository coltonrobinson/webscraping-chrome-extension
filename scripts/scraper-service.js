import Parser from './parser.js';

const parser = new Parser()

const allLinkButton = document.getElementById('all-links-button');
allLinkButton.addEventListener('click', () => addElementsToPopup(parser.html));

const sendButton = document.getElementById('send-button');
sendButton.addEventListener('click', sendLinks);

function addElementsToPopup(elementArray) {
    elementArray = [...elementArray.querySelectorAll('a')];
    const contentDiv = document.getElementById('output');
    contentDiv.innerHTML = '';

    elementArray.forEach(element => {
        const href = element.href
        if (href.startsWith('chrome') || !href) return;

        const elementTag = document.createElement('a');
        elementTag.setAttribute('href', href);
        elementTag.setAttribute('target', '_blank');
        elementTag.innerHTML = href + '<br />';
        contentDiv.appendChild(elementTag);
    });
}

async function sendLinks() {
    
}