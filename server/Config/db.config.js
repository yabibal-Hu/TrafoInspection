const mysql = require("mysql2/promise");

const dbConfig = {
  connectionLimit: 10,
  // socketPath: process.env.DB_SOCKET,
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  waitForConnections: true,
};

const pool = mysql.createPool(dbConfig);

async function query(sql, params) {
  try {
    const [rows, fields] = await pool.execute(sql, params);
    
    return rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}

// Export the query function
module.exports = {
  query,pool
};
