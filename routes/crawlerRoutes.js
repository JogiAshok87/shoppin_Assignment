const express = require("express");
const { crawlMultipleDomains } = require("../crawler");
const fs = require("fs");
const router = express.Router();

// POST: Start the crawler
router.post("/", async (req, res) => {
  const { domains } = req.body;

  if (!Array.isArray(domains) || domains.length === 0) {
    return res.status(400).json({ error: "Invalid domains input" });
  }

  try {
    const results = await crawlMultipleDomains(domains);

    // Save results to file
    fs.writeFileSync("output/results.json", JSON.stringify(results, null, 2));

    res.status(200).json({ message: "Crawling complete", results });
  } catch (error) {
    console.error("Error during crawling:", error.message);
    res.status(500).json({ error: "Crawling failed" });
  }
});

module.exports = router;
