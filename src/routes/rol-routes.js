'use-strict';
const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rol-controller')

router.route('/roles')
    .get(rolController.getAll)

module.exports = router;