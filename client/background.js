chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed and ready.");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "CLOSE_TAB") {
        // Close the sender's tab
        if (sender.tab && sender.tab.id) {
            chrome.tabs.remove(sender.tab.id, () => {
                console.log(`Tab ${sender.tab.id} closed.`);
                sendResponse({ success: true });
            });
        } else {
            console.error("No tab information available.");
            sendResponse({ success: false, error: "No tab information available." });
        }
    }
    return true; // Required to use `sendResponse` asynchronously
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) {
        const bannedUrls = ["example.com", "bannedsite.com"]; // Add your banned URLs here
        const isBanned = bannedUrls.some((url) => tab.url.includes(url));

        if (isBanned) {
            // Open the BlockedPage (a React page) when a banned URL is accessed
            chrome.tabs.create({ url: chrome.runtime.getURL("blocked.html") }); // blocked.html is the React page (blocked page)
        }
    }
});
