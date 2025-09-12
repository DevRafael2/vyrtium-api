'use-strict';
const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware")
const categoryController = require('../controllers/category-controller')

router.route('/categories')
    .get(authMiddleware, categoryController.getAll)
    .post(authMiddleware, categoryController.create)

router.route('/categories/:id')
    .get(authMiddleware, categoryController.getById)
    .put(authMiddleware, categoryController.update)
    .delete(authMiddleware, categoryController.delete)

module.exports = router;