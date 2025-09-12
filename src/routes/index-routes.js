const express = require("express");
const router = express.Router();

const userRoutes = require("./user-routes");
const categoryRoutes = require("./category-routes");
const customerRoutes = require("./customer-routes");
const rolRoutes = require("./rol-routes");
const contactRoutes = require('./contacat-routes')

router.use("/api", userRoutes);
router.use("/api", categoryRoutes);
router.use("/api", customerRoutes);
router.use("/api", rolRoutes);
router.use("/api", contactRoutes);

module.exports = router;