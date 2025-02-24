const transformerService = require("../Services/transformer.service");

async function createTransformer(req, res) {
  try {
    const transformer = await transformerService.createTransformer(req.body);
    return res
      .status(transformer.status)
      .json({ message: transformer.message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllTransformers(req, res) {
  try {
    const transformers = await transformerService.getAllTransformers();
    return res.status(200).json(transformers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateLastInspectionDate(req, res) {
  try {
    const transformerId = req.params.transformer_id;
    const last_inspection_date = req.body.last_inspection_date;
    const transformer = await transformerService.updateLastInspectionDate(
      transformerId,
      last_inspection_date
    );
    return res
      .status(transformer.status)
      .json({ message: transformer.message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createTransformer,
  getAllTransformers,
  updateLastInspectionDate,
};
