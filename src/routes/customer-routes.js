'use-strict';
const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware")
const customerController = require('../controllers/customer-controller')

router.route('/customers')
    .get(authMiddleware, customerController.getAll)
    .post(authMiddleware, customerController.create)

router.route('/customers/:id')
    .get(authMiddleware, customerController.getById)
    .put(authMiddleware, customerController.update)
    .delete(authMiddleware, customerController.delete)

module.exports = router;