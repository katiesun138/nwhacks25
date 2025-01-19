import { processUrl } from "./WebScrapper.js";

async function main() {
  const url = "https://en.wikipedia.org/wiki/Computer_science"; // URL is passed directly
  let keywords = await processUrl(url);

  if (keywords.length === 0) {
    console.error("No keywords could be extracted from the text.");
    return;
  }

  console.log(`Top keywords from ${url}:`);
  keywords.forEach(([keyword, count]) => {
    console.log(`${keyword}: ${count}`);
  });
}

main().catch((error) => {
  console.error(`Unexpected error: ${error}`);
});
