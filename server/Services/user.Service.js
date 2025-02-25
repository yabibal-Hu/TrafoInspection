const conn = require("../Config/db.config");
// createUser service
async function createUser(user) {
  const connection = await conn.pool.getConnection();
  const sql =
    "INSERT INTO users (username, password_hashed, role) VALUES (?, ?, ?)";

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
  } finally {
    connection.release(); // Always release the connection
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
  } finally {
    connection.release(); // Always release the connection
  }
}

// loginUser service
async function loginUser(user) {
  const connection = await conn.pool.getConnection();
  try {
    const sql = "SELECT username, role FROM users WHERE username = ? AND password_hashed = ?";
    const [rows] = await connection.execute(sql, [user.username, user.password_hashed]);

    if (rows.length === 0) {
      return { status: 401, message: "Invalid username or password" };
    }

    return { status: 200, message: rows[0] }; // Return user data (username, role)
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}


module.exports = { createUser, getUserByUsername, loginUser };
