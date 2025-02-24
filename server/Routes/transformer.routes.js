const express = require("express");
const router = express.Router();
const transformerController = require("../Controllers/transformer.controller");

// Route for creating a transformer
router.post("/api/transformer", transformerController.createTransformer);

// Route for getting all transformers
router.get("/api/transformers", transformerController.getAllTransformers);

// Export the router
module.exports = router;
