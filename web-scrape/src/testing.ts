// Import the scraping functions from webScrapper.ts
const { fetchWebsiteContent, extractTextFromHtml, extractKeywords } = require('./WebScrapper.ts');

async function main() {
    // URL to scrape
    const url = 'https://en.wikipedia.org/wiki/Computer_science';

    console.log(`Scraping content from: ${url}`);
    // Fetch the HTML content from the URL
    const htmlContent = await fetchWebsiteContent(url);
    if (!htmlContent) {
        console.error('Failed to fetch website content.');
        return;
    }

    // Extract the text content from the HTML
    const textContent = extractTextFromHtml(htmlContent);
    if (!textContent) {
        console.error('Failed to extract text from HTML.');
        return;
    }

    // Extract the top keywords from the text content
    const keywords = extractKeywords(textContent, 10); // Get top 10 keywords
    if (keywords.length === 0) {
        console.error('No keywords found.');
        return;
    }

    // Display the extracted keywords
    console.log('Top Keywords:');
    console.table(keywords);
}

// Run the main function
main().catch(error => {
    console.error(`Unexpected error: ${error}`);
});
