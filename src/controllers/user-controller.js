'use-strict';
var mongoose = require('mongoose')
require('../models/rol')
require('../models/user')
const User = mongoose.model('users')
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

/**
 * Metodo para obtener todos los usuarios
 */
exports.getAll = async function(req, res) {
    const page = parseInt(req.query.currentPage ?? 1);
    const limit = parseInt(req.query.pageSize ?? 1);
    const skip = (page - 1) * limit;
    var users = await User.find({}).populate("rol")
        .skip(skip)
        .limit(limit)

    const total = await User.countDocuments();
    res.status(200).json({
        data: users,
        actualPage: page,
        countPages: Math.ceil(total / limit),
        countData: total
    })
}

/**
 * Metodo para crear nuevo usuario
 */
exports.create = async function(req, res) {
    const userExist = await User.find({email: req.body.email}); 
    if(userExist != null)
        return res.status(400).json({ message: 'Ya existe un usuario con el mismo correo electronico' })

    const hash = crypto.createHash("sha256").update(req.body.password).digest("hex");
    var newUser = new User({...req.body, password: hash})

    const user = await newUser.save(); 
    res.json({
        message: "Usuario creado exitosamente",
        data: user
    });
}

/**
 * Metodo para iniciar sesión 
 */
exports.signIn = async function(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    const hash = crypto.createHash("sha256").update(password).digest("hex");
    if(hash != user.password){
        res.status(400).json({message: "Credenciales incorrectas"})
        return;
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, userName: user.name, rol: user.rol._id },
      process.env.JWT_SECRET
    );

    res.status(200).json({
        message: "Usuario autenticado exitosamente",
        data: {
            userName: user.name,
            token: token
        }
    })
}