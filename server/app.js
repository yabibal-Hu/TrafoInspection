// Import dependencies
const express = require("express");
require("dotenv").config();

const cors = require("cors");

const router = require("./Routes/index"); // Import the router
// CORS setup
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

// Create Express app
const app = express();
const port = process.env.PORT || 3000; // Fallback to port 3000 if process.env.PORT is not defined

// Middleware

app.use(cors(corsOptions));
app.use(express.json());
app.use("/", router); // If you have additional routes
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Export the app for use in other parts of the application
module.exports = app;
