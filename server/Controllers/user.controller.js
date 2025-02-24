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

async function loginUser(req, res) {
  try {
    const user = await userService.loginUser(req.body);
    return res.status(user.status).json({ message: user.message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createUser, getUserByUsername, loginUser };
