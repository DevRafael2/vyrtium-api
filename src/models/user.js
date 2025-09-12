'use-strict';
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

/**
 * Esquema de usuarios
 */
var User = new Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    rol: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles"
    }
})
module.exports = mongoose.model('users', User);