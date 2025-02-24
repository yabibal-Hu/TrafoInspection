const express = require("express");
const router = express.Router();
const inspectionController = require("../Controllers/inspection.controller");

// Route for creating a transformer inspection
router.post("/api/inspection", inspectionController.createInspection);
// Route for getting all transformer inspections
router.get("/api/inspections", inspectionController.getAllInspections);
// Route for getting inspections by inspection date and transformer name
router.get("/api/inspections/:inspectionDate/transformer/:transformerName", inspectionController.getInspectionsByTransformerName);
// Route for getting inspections by inspection date
router.get("/api/inspections/:inspectionDate/date", inspectionController.getInspectionsByInspectionDate);

// Export the router
module.exports = router;
