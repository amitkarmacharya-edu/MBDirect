const router = require("express").Router();
const companyRoutes = require("./companies");
const userRoutes = require("./users");

// Company routes
router.use("/companies", companyRoutes);
router.use("./users",userRoutes);

module.exports = router;
