'use-strict';
var mongoose = require('mongoose')
require('../models/contact')
const Contact = mongoose.model('contacts')

/**
 * Metodo para obtener todas las categorias
 */
exports.getAll = async function(req, res) {

    const page = parseInt(req.query.currentPage ?? 1);
    const limit = parseInt(req.query.pageSize ?? 5);
    const skip = (page - 1) * limit;
    var categories = await Contact.find({})
        .skip(skip)
        .limit(limit)

    const total = await Contact.countDocuments();
    res.status(200).json({
        data: categories,
        actualPage: page,
        countPages: Math.ceil(total / limit),
        countData: total
    })
}

/**
 * Metodo para obtener una categoría
 */
exports.getById = async function(req, res) {
    var entityId = req.params.id

    const entity = await Contact.findById(entityId); 
    res.json({
        message: "Registro obtenido",
        data: entity
    });
}

/**
 * Metodo para crear nuevo cliente
 */
exports.create = async function(req, res) {
    var newContact = new Contact(req.body)

    const contact = await newContact.save(); 
    res.json({
        message: "Contacto creado exitosamente",
        data: contact
    });
}


/**
 * Metodo para actualizar cliente
 */
exports.update = async function(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    const updated = await Contact.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true 
    });

    if (!updated) return res.status(404).json({ message: 'Contacto no encontrado' });

    res.json({
        message: "Contacto actualizado correctamente",
        data: updated
    });
}

/**
 * Metodo para eliminar contactos
 */
exports.delete = async function(req, res) {
    const { id } = req.params;
    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) 
      return res.status(404).json({ message: 'Contacto no encontrado' });

    res.json({ message: 'Contacto eliminado correctamente' });   
}