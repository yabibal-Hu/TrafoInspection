const conn = require("../Config/db.config");

// Create Transformer Inspection Service
async function createInspection(inspection) {
 const connection = await conn.pool.getConnection();
  const sql = `
    INSERT INTO TransformerInspections (
      transformer_name, username,  transformer_temp, 
      left_green_line_temp, left_yellow_line_temp, left_red_line_temp, left_blue_line_temp, 
      right_green_line_temp, right_yellow_line_temp, right_red_line_temp, right_blue_line_temp, 
      line_temp_under_the_base, comments, inspection_date,weather,temperature
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await connection.execute(sql, [
      inspection.transformer_name,
      inspection.username,
      inspection.transformer_temp,
      inspection.left_green_line_temp,
      inspection.left_yellow_line_temp,
      inspection.left_red_line_temp,
      inspection.left_blue_line_temp,
      inspection.right_green_line_temp,
      inspection.right_yellow_line_temp,
      inspection.right_red_line_temp,
      inspection.right_blue_line_temp,
      inspection.line_temp_under_the_base,
      inspection.comments,
      inspection.inspection_date,
      inspection.weather,
      inspection.temperature,
    ]);
    return { status: 201, message: "Inspection record created successfully" };
  } catch (error) {
    throw error;
  } finally {
    connection.release(); // Always release the connection
  }
}

// Get All Transformer Inspections Service
async function getAllInspections() {
  const connection = await conn.pool.getConnection();
  const sql = "SELECT * FROM TransformerInspections";

  try {
    const [rows] = await connection.execute(sql);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release(); // Always release the connection
  }
}

// Get Transformer Inspections By inspection date and Transformer Name Service
async function getInspectionsByTransformerName(transformerName, inspectionDate) {
  const connection = await conn.pool.getConnection();
  const sql =
    "SELECT * FROM TransformerInspections WHERE transformer_name = ? AND DATE(inspection_date) = ?";

  try {
    const [rows] = await connection.execute(sql, [
      transformerName,
      inspectionDate,
    ]);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release(); // Always release the connection
  }
}

// Get Transformer Inspections By Inspection Date Service
// in the db inspection_date is in the format 2025-02-28 23:33:00 but send from the params is 2025-02-28 so i want get all inspections by only the date not the time
async function getInspectionsByInspectionDate(inspectionDate) {
  const connection = await conn.pool.getConnection();
  const sql =
    "SELECT * FROM TransformerInspections WHERE DATE(inspection_date) = ?";

  try {
    const [rows] = await connection.execute(sql, [inspectionDate]);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release(); // Ensure connection is released
  }
}



module.exports = {
  createInspection,
  getAllInspections,
  getInspectionsByTransformerName,
  getInspectionsByInspectionDate
};
