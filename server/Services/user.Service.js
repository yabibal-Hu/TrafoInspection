const conn = require("../Config/db.config");
// createUser service
async function createUser(user) {
 const connection = await conn.pool.getConnection();
 const sql =
    "INSERT INTO Users (username, password_hashed, role) VALUES (?, ?, ?)";

  try {
    const [result] = await connection.execute(sql, [
      user.username,
      user.password_hashed,
      user.role,
    ]);
    return { status: 201, message: "User created successfully" };
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return { status: 400, message: "Username already exists" };
    }
    throw error;
  }
}

// getUserByUsername service
async function getUserByUsername(username) {
  const connection = await conn.pool.getConnection();
  const sql = "SELECT * FROM users WHERE username = ?";

  try {
    const [rows] = await connection.execute(sql, [username]);
    return { status: 200, message: rows };
  } catch (error) {
    throw error;
  }
}

// loginUser service
async function loginUser(user) {
  const connection = await conn.pool.getConnection();
  const sql = "SELECT * FROM users WHERE username = ? AND password_hashed = ?";

  try {
    const [rows] = await connection.execute(sql, [user.username, user.password_hashed]);
    return { status: 200, message: rows };
  } catch (error) {
    throw error;
  }
}

module.exports = { createUser, getUserByUsername, loginUser };
