const router = require("express").Router();
const customerRoutes = require("./customer");

// Book routes
router.use("/customer", customerRoutes);

module.exports = router;
