const inspectionService = require("../Services/inspection.service");

async function createInspection(req, res) {
  try {
    const inspection = await inspectionService.createInspection(req.body);
    return res.status(inspection.status).json({ message: inspection.message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllInspections(req, res) {
  try {
    const inspections = await inspectionService.getAllInspections();
    return res.status(200).json(inspections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get inspections by inspection date and transformer name
async function getInspectionsByTransformerName(req, res) {

  const inspectionDate = req.params.inspectionDate.split(" ")[0];
  const transformerName = req.params.transformerName;

  try {
    const inspections =
      await inspectionService.getInspectionsByTransformerName(
        transformerName,
        inspectionDate
      );
    return res.status(200).json(inspections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getInspectionsByInspectionDate(req, res) {
  // inspection date is in the format "YYYY-MM-DD" but send from the params is 2025-02-28 23:33:00 so remove the time
  const inspectionDate = req.params.inspectionDate.split(" ")[0];

  try {
    const inspections =
      await inspectionService.getInspectionsByInspectionDate(
        inspectionDate
      );
    return res.status(200).json(inspections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createInspection,
  getAllInspections,
  getInspectionsByTransformerName,
  getInspectionsByInspectionDate,
};
