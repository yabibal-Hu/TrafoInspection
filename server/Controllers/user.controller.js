const userService = require("../Services/user.Service");

async function createUser(req, res) {
  try {
    const user = await userService.createUser(req.body);
    return res.status(user.status).json({ message: user.message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserByUsername(req, res) {
  try {
    const user = await userService.getUserByUsername(req.params.username);
    return res.status(user.status).json({ message: user.message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// login controller
async function loginUser(req, res) {
  try {
    // Get username & password from query parameters (not req.body)
    const { username, password_hashed } = req.query;

    if (!username || !password_hashed) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await userService.loginUser({ username, password_hashed });

    if (user.status !== 200) {
      return res.status(user.status).json({ message: user.message });
    }

    return res.status(200).json(user.message); // Send user data directly
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}



module.exports = { createUser, getUserByUsername, loginUser };
