const router = require("express").Router();
const companyRoutes = require("./companies");

// Company routes
router.use("/companies", companyRoutes);

module.exports = router;
