//called when extension is installed/updated or chrome is updated
chrome.runtime.onInstalled.addListener(function (object) {
    chrome.tabs.create({url: "options.html"}, function (tab) {
    });
});