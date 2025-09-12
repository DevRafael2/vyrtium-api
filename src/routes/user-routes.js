'use-strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller')

router.route('/users')
    .get(userController.getAll)
    .post(userController.create)

router.post('/users/sign-in', userController.signIn)
module.exports = router;