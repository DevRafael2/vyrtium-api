'use-strict';
var mongoose = require('mongoose')
require('../models/customer')
const Customer = mongoose.model('customers')

/**
 * Metodo para obtener todos los clientes
 */
exports.getAll = async function(req, res) {
    const page = parseInt(req.query.currentPage ?? 1);
    const limit = parseInt(req.query.pageSize ?? 5);
    const skip = (page - 1) * limit;
    var customers = await Customer.find({}).populate('category', 'name')
        .skip(skip)
        .limit(limit)

    const total = await Customer.countDocuments();
    const outCustomers = customers.map(e => ({ 
            _id: e._id,
            categoryName: e.category.name,
            name: e.name
        }));
    res.status(200).json({
        data: outCustomers,
        actualPage: page,
        countPages: Math.ceil(total / limit),
        countData: total
    })
}

/**
 * Metodo para obtener un cliente
 */
exports.getById = async function(req, res) {
    var entityId = req.params.id

    const entity = await Customer.findById(entityId); 
    res.json({
        message: "Registro obtenido",
        data: entity
    });
}

/**
 * Metodo para crear nuevo cliente
 */
exports.create = async function(req, res) {
    var newCustomer = new Customer(req.body)

    const customer = await newCustomer.save(); 
    res.json({
        message: "Cliente creado exitosamente",
        data: customer
    });
}

/**
 * Metodo para crear nuevo cliente
 */
exports.update = async function(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    const updated = await Customer.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true 
    });

    if (!updated) return res.status(404).json({ message: 'Cliente no encontrado' });

    res.json({
        message: 'Cliente actualizado exitosamente',
        data: updated
    });
}

/**
 * Metodo para eliminar clientes
 */
exports.delete = async function(req, res) {
    const { id } = req.params;
    const deleted = await Customer.findByIdAndDelete(id);

    if (!deleted) 
      return res.status(404).json({ message: 'Cliente no encontrado' });

    res.json({ message: 'Cliente eliminado correctamente' });   
}