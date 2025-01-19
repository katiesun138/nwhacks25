// Import required libraries
import axios from 'axios';
import * as cheerio from 'cheerio';
import {OpenAI} from 'openai';
import dotenv from 'dotenv';
import natural from 'natural';

dotenv.config();

// import natural from 'natural'

// Stopwords list (can be loaded dynamically if needed)
const stopwords = new Set([
    'the', 'is', 'in', 'and', 'to', 'a', 'of', 'it', 'that', 'on', 'for', 'with', 'as',
    'was', 'at', 'by', 'an', 'be', 'this', 'which', 'or', 'from', 'are', 'but', 'not',
    'have', 'has', 'you', 'they', 'we', 'can', 'their', 'its', 'if', 'will', 'so', 'do'
]);

// Fetch website content with improved error handling
export async function fetchWebsiteContent(url) {
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
export function extractTextFromHtml(html) {
    const $ = cheerio.load(html);

    // Remove script and style tags
    $('script, style, noscript').remove();

    // Extract and clean text content
    const text = $('body').text()
        .replace(/[^a-zA-Z\s]/g, '') 
        .replace(/\s+/g, ' ')
        .trim();

    if (!text) {
        console.warn('Warning: Extracted text is empty. Check the structure of the page.');
    }

    // console.log("\n\n\n\n\n\n\nTESTING SCRAPED TEXT IN WEBSCRAPER", text)
    return text;
}




//Katie testing implementaiton ------------------------------------------------------------------------------------------------

const askForSimilarity = async (text1, listofString) => {
    const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: `${process.env.OPENAI_API_KEY}`,
    });

    const cleanList = listofString.map(item => item.replace(/^\d+\.\s*/, "").trim());
    const combineKeywords = cleanList.join(" ");
    console.log(" \n\n\n\n\n\n\n\n\n\nHERE IS THE COMBINE", combineKeywords);

    try {
        const completion = await openai.chat.completions.create({
            model: "openchat/openchat-7b:free",
            messages: [
                {
                    "role": "user",
                    "content": `${combineKeywords} compared with ${text1} how related are these two texts, return only one number, 1 for related, 0 for unrelated topics, nothing more`,
                }
            ]
        });
    
        if (completion && completion.choices && completion.choices.length > 0) {
            const message = completion.choices[0].message.content;
            console.log("THIS IS WITHIN WEB SCRAPER:", message);
    
            // Check if the message contains '1' or '0' and return a boolean value
            if (message.includes('1')) {
                return true; // Texts are related
            } else if (message.includes('0')) {
                return false; // Texts are unrelated
            } else {
                console.warn('Unexpected response format:', message);
                return null; // If neither '1' nor '0' is found
            }
        } else {
            console.error('Error: No valid choices in OpenAI response', completion);
            return null;
        }
    } catch (error) {
        console.error('Error with OpenAI API request:', error);
        return null;
    }
    
};


const isGoogleSearch = (url) => {
    const googleSearchPattern = /^https:\/\/www\.google\.com\/search/;
    return googleSearchPattern.test(url);
};

export async function processUrl(url, promptTopicWordBank) {
    console.log(`Fetching content from: ${url}`);

    if (isGoogleSearch(url)) {
        console.log('Skipping processing for Google search URL:', url);
        return;
    }

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
    const combinedKeywords = keywords.map((item) => item[0]).join(' ')
    console.log("\n\n\n\n\nHERE IS THE COMBINED KEYWORDS FROM EXTRACTED", combinedKeywords);

    console.log("Here is the word bank", promptTopicWordBank);

    return isSimilar(combinedKeywords, promptTopicWordBank);
    // return askForSimilarity(combinedKeywords, promptTopicWordBank)

}

function cosineSimilarity(vec1, vec2) {
    if (!Array.isArray(vec1) || !Array.isArray(vec2)) {
        throw new Error('Input vectors must be arrays');
    }
    const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
    const magnitude1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
    const magnitude2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitude1 * magnitude2);
}

// function getTfidfVector(tfidf, text) {
//     return new Promise((resolve, reject) => {
//         tfidf.tfidfs(text, (i, measure) => {
//             resolve(measure);
//         });
//     });
// }

function generateVectors(tfidf, documents){
    // Get the full vocabulary (all unique terms)
    const vocabulary = new Set();
    tfidf.documents.forEach(doc => {
        Object.keys(doc).forEach(term => vocabulary.add(term));
    });

    const vocabArray = Array.from(vocabulary);
    console.log("Vocabulary:", vocabArray); // Added for debugging


    // Create vectors for each document
    return documents.map((doc, docIndex) => {
        const vector = new Array(vocabArray.length).fill(0); // Changed to initialize vector with zeros
        vocabArray.forEach((term, termIndex) => {
            vector[termIndex] = tfidf.tfidf(term, docIndex); // Changed to correctly set TF-IDF values
        });
        return vector;
    });
}

async function isSimilar(text1, text2) {
    console.log("Text1:", text1);
    console.log("Text2:", text2);
    const TfIdf = natural.TfIdf;
    const tokenizer = new natural.WordTokenizer();
    const tokens1 = tokenizer.tokenize(text1);
    const tokens2 = tokenizer.tokenize(text2.slice(1).join(" "));
    // Example with TF-IDF
    const tfidf = new TfIdf();
    tfidf.addDocument(tokens1.join(' '));
    tfidf.addDocument(tokens2.join(' '));
    console.log("Documents added to TF-IDF model:");
    console.log(tfidf.documents); // Added for debugging

    const [vector1, vector2] = generateVectors(tfidf, [text1, text2]);
    console.log("Vector1:", vector1);
    console.log("Vector2:", vector2);

    const similarity = cosineSimilarity(vector1, vector2);
    console.log(`Cosine Similarity: ${similarity}`);
    const threshold = 0.000005;
    return similarity > threshold;
}


//END -------------------------------------------------------------------------------------------------------------------------

// Extract keywords with enhancements
export function extractKeywords(text, numKeywords = 10) {
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

// Main function that processes a given URL directly
// export async function processUrl(url) {
//     console.log(`Fetching content from: ${url}`);

//     const htmlContent = await fetchWebsiteContent(url);
//     if (!htmlContent) {
//         console.error('Failed to fetch website content.');
//         return;
//     }

//     const text = extractTextFromHtml(htmlContent);
//     if (!text) {
//         console.error('No text content could be extracted from the HTML.');
//         return;
//     }

//     const keywords = extractKeywords(text);

//     return keywords;

// }
