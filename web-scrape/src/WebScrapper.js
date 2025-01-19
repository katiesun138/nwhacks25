// Import required libraries
import axios from 'axios';
import * as cheerio from 'cheerio';


// Stopwords list (can be loaded dynamically if needed)
const stopwords = new Set([
    'the', 'is', 'in', 'and', 'to', 'a', 'of', 'it', 'that', 'on', 'for', 'with', 'as',
    'was', 'at', 'by', 'an', 'be', 'this', 'which', 'or', 'from', 'are', 'but', 'not',
    'have', 'has', 'you', 'they', 'we', 'can', 'their', 'its', 'if', 'will', 'so', 'do'
]);

// Fetch website content with improved error handling
async function fetchWebsiteContent(url) {
    try {
        const response = await axios.get(url, { timeout: 10000 }); // 10-second timeout
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(`Axios error fetching the URL: ${error.message}`);
        } else {
            console.error(`Unexpected error: ${error}`);
        }
        return null;
    }
}

// Extract text from HTML, handling edge cases
function extractTextFromHtml(html) {
    const $ = cheerio.load(html);

    // Remove script and style tags
    $('script, style, noscript').remove();

    // Extract and clean text content
    const text = $('body').text().replace(/\s+/g, ' ').trim();

    if (!text) {
        console.warn('Warning: Extracted text is empty. Check the structure of the page.');
    }

    return text;
}

// Extract keywords with enhancements
function extractKeywords(text, numKeywords = 10) {
    const words = text
        .toLowerCase()
        .replace(/[^a-zA-Z\s]/g, '') // Remove non-alphanumeric characters
        .split(/\s+/);

    // Filter out stopwords and short words
    const filteredWords = words.filter(word => word.length > 2 && !stopwords.has(word));

    if (filteredWords.length === 0) {
        console.warn('Warning: No significant keywords found in the text.');
    }

    // Count word frequencies
    const wordCounts = {};
    for (const word of filteredWords) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
    }

    // Sort by frequency and return the top keywords
    return Object.entries(wordCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, numKeywords);
}

// Main function with better UX and logging
async function main(url) {
    console.log(`Fetching content from: ${url}`);

    const htmlContent = await fetchWebsiteContent(url);
    if (!htmlContent) {
        console.error('Failed to fetch website content.');
        return;
    }

    const text = extractTextFromHtml(htmlContent);
    if (!text) {
        console.error('No text content could be extracted from the HTML.');
        return;
    }

    const keywords = extractKeywords(text);
    if (keywords.length === 0) {
        console.error('No keywords could be extracted from the text.');
        return;
    }

    console.log(`Top keywords from ${url}:`);

    console.log(keywords);
    keywords.forEach(([keyword, count]) => {
        console.log(`${keyword}: ${count}`);
    });
}

// Command-line argument handling
const inputUrl = process.argv[2];
if (!inputUrl) {
    console.error('Please provide a URL as an argument. Usage: node script.js <URL>');
    process.exit(1);
}

main(inputUrl).catch(error => {
    console.error(`Unexpected error: ${error}`);
});
