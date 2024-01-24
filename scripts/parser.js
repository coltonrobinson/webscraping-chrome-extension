export default class Parser {
    setError(message) {
        this.errorMessage.innerHTML = message;
    }

    clearError() {
        this.errorMessage.innerHTML = '';
    }

    setPageHtml() {
        chrome.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
            var activeTab = tabs[0];
            var activeTabId = activeTab.id;

            if (activeTab.url.startsWith('chrome://')) {
                throw new Error('Cannot use this plugin on a chrome page!');
            }

            return chrome.scripting.executeScript({
                target: { tabId: activeTabId },
                func: DOMtoString,
            });

        }).then(function (results) {
            const parser = new DOMParser()
            const parsedHtml = parser.parseFromString(results[0].result, 'text/html')
            return parsedHtml;
        }).then(html => {
            this.html = html;
        })
        .catch(error => {
            this.setError(`An error occured: ${error}`);
        });


        function DOMtoString(selector) {
            if (selector) {
                selector = document.querySelector(selector);
                if (!selector) return "ERROR: querySelector failed to find node";
            } else {
                selector = document.documentElement;
            }
            return selector.outerHTML;
        }
    }

    constructor() {
        this.errorMessage = document.getElementById('error-message');
        this.setPageHtml();
    }
}