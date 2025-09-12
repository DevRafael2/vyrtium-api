'use-strict';
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

/**
 * Esquema de usuarios
 */
const Customer = new Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        require: true
    }
})
module.exports = mongoose.model('customers', Customer);