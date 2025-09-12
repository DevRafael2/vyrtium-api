'use-strict';
var mongoose = require('mongoose')
require('../models/rol')
const Roles = mongoose.model('roles')

/**
 * Metodo para obtener todos los roles
 */
exports.getAll = async function(req, res) {
    var roles = await Roles.find({})

    res.status(200).json({
        data: roles,
    })
}