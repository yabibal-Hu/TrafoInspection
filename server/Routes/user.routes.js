const express = require("express");
const router = express.Router();
const userController = require("../Controllers/user.controller");

// Route for creating a user
router.post("/api/user", userController.createUser);
// Route for get user by username
router.post("/api/user/:username", userController.getUserByUsername);
// Route for login user
router.post("/api/login", userController.loginUser);

// Export the router
module.exports = router;