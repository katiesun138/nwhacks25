// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'setCurrentTopic') {
        const topic = message.value;
        // Store the topic in Chrome storage
        chrome.storage.local.set({ currentTopic: topic }, () => {
            console.log('currentTopic saved in Chrome storage:', topic);
            sendResponse({ status: 'success' });
        });
        return true; // Keep the message channel open for async response
    }
});


// Listen for web navigation completion
chrome.webNavigation.onCompleted.addListener(async (details) => {
    try {
        // Get the tab ID from the details object
        const tabId = details.tabId;

        // Use chrome.tabs API to get the tab details
        chrome.tabs.get(tabId, async (tab) => {
            if (tab.url) {
                console.log('Current page URL:', tab.url); // Logs the URL of the page

                // Retrieve the current topic from Chrome storage
                chrome.storage.local.get('currentTopic', async (result) => {
                    const currentTopic = result.currentTopic || '';
                    console.log('Retrieved currentTopic:', currentTopic);

                    // Send the URL to the backend for validation
                    try {
                        const response = await fetch('http://localhost:8080/check-url', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ url: tab.url }),
                            // body: JSON.stringify({ url: tab.url, keyword: currentTopic }),
                        });

                        // Parse the response
                        const result = await response.json();
                        console.log('API response:', result);

                        // If the URL is invalid (i.e., `data` is false), redirect to the blocked HTML page
                        if (result.data === false) {
                            chrome.tabs.update(tabId, { url: 'blocked.html' }); // Redirect to blocked page
                            console.log('URL is blocked. Redirecting...');
                        }
                    } catch (fetchError) {
                        console.error('Error sending URL to backend:', fetchError);
                    }
                });
            }
        });
    } catch (error) {
        console.error("Error fetching tab details:", error);
    }
}, { url: [{ urlMatches: 'http://*/*' }, { urlMatches: 'https://*/*' }] }); // URL filter
