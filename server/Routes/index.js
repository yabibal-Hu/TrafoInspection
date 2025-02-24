// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the necessary routers
const installRouter = require("./install.routes");
const userRouter = require("./user.routes");
const transformerRouter = require("./transformer.routes");
const inspectionRouter = require("./inspection.routes");
// use / for defaul welcome message
router.get("/", (req, res) => res.send("Welcome to the server!"));
router.use(installRouter);
router.use(userRouter);
router.use(transformerRouter);
router.use(inspectionRouter);
// Export the router
module.exports = router;