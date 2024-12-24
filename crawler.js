const axios = require("axios");
const cheerio = require("cheerio");
const { isProductURL } = require("./utils");

// Crawl a single domain
const crawlDomain = async (domain, maxDepth = 3) => {
  const visited = new Set();
  const productURLs = new Set();

  // Helper function for recursive crawling
  const crawlPage = async (url, depth) => {
    if (visited.has(url) || depth > maxDepth) return;
    visited.add(url);

    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      $("a[href]").each((_, element) => {
        const href = $(element).attr("href");
        const fullURL = new URL(href, domain).href;

        if (isProductURL(fullURL)) {
          productURLs.add(fullURL);
        } else if (fullURL.startsWith(domain)) {
          crawlPage(fullURL, depth + 1);
        }
      });
    } catch (error) {
      console.error(`Failed to crawl ${url}:`, error.message);
    }
  };

  await crawlPage(domain, 0);

  return Array.from(productURLs);
};

// Crawl multiple domains
const crawlMultipleDomains = async (domains) => {
  const results = {};
  for (const domain of domains) {
    console.log(`Crawling ${domain}...`);
    results[domain] = await crawlDomain(domain);
  }
  return results;
};

module.exports = { crawlDomain, crawlMultipleDomains };
