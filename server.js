const express = require("express");
const cors = require("cors");
const crawlerRoutes = require("./routes/crawlerRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/crawler", crawlerRoutes);

// Start the server
const PORT = 2000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
