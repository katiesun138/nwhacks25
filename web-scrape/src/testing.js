import { processUrl } from './WebScrapper.js';

async function main() {
    const url = "https://en.wikipedia.org/wiki/Computer_science"; // URL is passed directly
    await processUrl(url);
}

main().catch(error => {
    console.error(`Unexpected error: ${error}`);
});
