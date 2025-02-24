const mysql = require("mysql2/promise");

const dbConfig = {
  connectionLimit: 20, // Increase limit to avoid exhausting pool
  queueLimit: 50, // Prevent indefinite waiting
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  waitForConnections: true,
};


const pool = mysql.createPool(dbConfig);

async function query(sql, params) {
  let connection;
  try {
    connection = await pool.getConnection(); // Get a connection from the pool
    const [rows] = await connection.execute(sql, params);
    return rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  } finally {
    if (connection) connection.release(); // Always release the connection
  }
}


// Export the query function
module.exports = {
  query,pool
};
