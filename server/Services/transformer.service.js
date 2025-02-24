const conn = require("../Config/db.config");

// Create Transformer Service
async function createTransformer(transformer) {
  const connection = await conn.pool.getConnection();
  const sql = "INSERT INTO Transformers (transformer_name) VALUES (?)";

  try {
    const [result] = await connection.execute(sql, [
      transformer.transformer_name,
    ]);
    return { status: 201, message: "Transformer created successfully" };
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return { status: 400, message: "Transformer already exists" };
    }
    throw error;
  }
}

// Get All Transformers Service
async function getAllTransformers() {
  const connection = await conn.pool.getConnection();
  const sql = "SELECT * FROM Transformers";

  try {
    const [rows] = await connection.execute(sql);
    return rows;
  } catch (error) {
    throw error;
  }
}

// Get Transformer Inspections By Inspection Date Service
// in the db inspection_date is in the format 2025-02-28 23:33:00 but send from the params is 2025-02-28 so i want get all inspections by only the date not the time
async function getInspectionsByInspectionDate(inspectionDate) {
  const connection = await conn.pool.getConnection();
  const sql = "SELECT * FROM TransformerInspections WHERE inspection_date = ?";

  try {
    const [rows] = await connection.execute(sql, [inspectionDate]);
    return rows;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  createTransformer,
  getAllTransformers,

};

