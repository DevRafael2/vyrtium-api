'use-strict';
var mongoose = require('mongoose')
require('../models/category')
const Category = mongoose.model('categories')

/**
 * Metodo para obtener todas las categorias
 */
exports.getAll = async function(req, res) {

    const page = parseInt(req.query.currentPage ?? 1);
    const limit = parseInt(req.query.pageSize ?? 5);
    const skip = (page - 1) * limit;
    var categories = await Category.find({})
        .skip(skip)
        .limit(limit)

    const total = await Category.countDocuments();
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

    const entity = await Category.findById(entityId); 
    res.json({
        message: "Registro obtenido",
        data: entity
    });
}

/**
 * Metodo para crear nueva categoría
 */
exports.create = async function(req, res) {
    var newCategory = new Category(req.body)

    const category = await newCategory.save(); 
    res.json({
        message: "Categoría creada exitosamente",
        data: category
    });
}


/**
 * Metodo para actualizar categoría
 */
exports.update = async function(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    const updated = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true 
    });

    if (!updated) return res.status(404).json({ message: 'Categoría no encontrada' });

    res.json({
        message: "Categoría actualizada correctamente",
        data: updated
    });
}

exports.delete = async function(req, res) {
    const { id } = req.params;
    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted) 
      return res.status(404).json({ message: 'Categoría no encontrada' });

    res.json({ message: 'Categoría eliminada correctamente' });   
}