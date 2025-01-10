const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const functions = require("firebase-functions")

// Import your router from the routes file
const authController = require("./authController"); // Assuming your file with routes is named authRoutes.js

// Use middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse incoming JSON requests

// Use the router for handling requests
app.use(authController); // This will handle routes like "/api/register" and "/api/login"

// Set up your server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

exports.api = functions.https.onRequest(app);
