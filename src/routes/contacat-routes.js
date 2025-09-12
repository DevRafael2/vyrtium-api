'use-strict';
const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware")
const contactController = require('../controllers/contact-controller')

router.route('/contacts')
    .get(authMiddleware, contactController.getAll)
    .post(authMiddleware, contactController.create)

router.route('/contacts/:id')
    .get(authMiddleware, contactController.getById)
    .put(authMiddleware, contactController.update)
    .delete(authMiddleware, contactController.delete)

module.exports = router;